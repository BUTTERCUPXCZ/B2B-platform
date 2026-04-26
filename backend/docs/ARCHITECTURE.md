# Buildora Backend — System Architecture

> NestJS · Prisma · Supabase (Postgres + Auth + Storage) · BullMQ · Redis
> Status: Design v1 · Last updated: 2026-04-26

## 0. Reading order

Read top-to-bottom on bootstrap. Each section assumes the conclusions of the previous one. Code examples are illustrative — adapt to your team's patterns. The frontend lives in the sibling `frontend/` directory and consumes this API; document upload UX in `frontend/src/components/jobs/post-job-page.tsx` is shaped to match the upload-intent flow in §2.2.

---

## 1. Architecture Overview

### Recommendation: **Modular Monolith** (with a separate worker process)

For a B2B marketplace handling sensitive documents, recommend a **modular monolith** — one Nest application split into strongly-bounded feature modules, deployed as **two processes**:

1. **`api`** — handles HTTP requests
2. **`worker`** — runs BullMQ workers for async jobs

Both share the same code repo, schema, and `node_modules`, but boot different entry points (`main.api.ts`, `main.worker.ts`). They scale independently.

**Why not microservices yet?**
- Cross-service transactions on a single Postgres are simpler than distributed sagas
- One team, one deploy artifact, fewer moving parts to secure
- Carve out a service later when a module's traffic profile or compliance scope demands it (e.g., when document scanning grows into its own ML service)

### Stack roles

| Layer | Tech | Purpose |
|---|---|---|
| HTTP API | NestJS | Routing, validation, guards, lifecycle hooks |
| ORM | Prisma | Typesafe DB access; migrations live in repo |
| Primary DB | Supabase Postgres | All transactional data, RLS as defense-in-depth |
| File storage | Supabase Storage | Documents, IDs, contracts (private bucket only) |
| Auth | Supabase Auth | Sign-up, password, MFA/TOTP, JWT issuance |
| Queue | BullMQ (Redis-backed) | Async jobs (scans, notifications, audit fan-out) |
| Cache + ratelimit | Redis (managed) | Hot reads, rate-limit counters, idempotency keys |
| CDN | Cloudflare in front of Supabase Storage | TLS, DDoS, signed-URL passthrough |

### High-level data flow

```
            ┌───────────┐
  Browser ──┤  Vite SPA ├──HTTPS──┐
            └───────────┘         │
                                  ▼
                         ┌──────────────┐
                         │  Cloudflare  │  TLS termination, WAF, DDoS
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   NestJS API    │ ← stateless, horizontally scaled
                       │   (Pod × N)     │
                       └─┬─────┬─────┬───┘
                         │     │     │
            ┌────────────┘     │     └─────────────┐
            ▼                  ▼                   ▼
     ┌────────────┐    ┌──────────────┐    ┌──────────────┐
     │  Postgres  │    │    Redis     │    │   Supabase   │
     │ (Supabase) │    │ cache+queue  │    │   Storage    │
     └────────────┘    └──────┬───────┘    └──────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │ BullMQ Worker   │ ← separate deploy
                       │   (Pod × M)     │
                       └─────────────────┘
```

### Document-flow lifecycle (preview — full detail in §3)

| Phase | What moves | Where |
|---|---|---|
| **Upload** | Browser → Supabase Storage directly via short-lived pre-signed URL issued by API | API never holds the bytes |
| **Process** | API enqueues BullMQ job; worker streams object, runs validation + scan, writes status back | Worker → Storage → DB |
| **Access** | API checks RBAC + audit, then returns a 5-minute signed URL the client uses to GET | API → DB → Storage signed URL |

---

## 2. Security Architecture (CRITICAL)

System stores government IDs, contracts, verification documents. Threat model: an authenticated low-privilege user attempting to access another user's documents, an external attacker attempting to brute-force or harvest data, and a compromised dependency.

### 2.1 Data protection

#### Encryption at rest
- **Database**: Supabase Postgres has AES-256 encryption at rest by default — confirm the project's region uses a customer-managed key (CMK) if compliance requires it.
- **Storage**: Supabase Storage encrypts all objects at rest. Buckets must be **private** with no public read.
- **Field-level encryption** for the most sensitive columns (ID numbers, tax IDs, KYC document hashes). Use a Postgres `pgcrypto` extension and store ciphertext in `bytea` columns. Encryption key lives in Supabase Vault or a Nest-side KMS abstraction (`CryptoService`); never in env vars in production. Pair with a `data_encryption_key_id` column so you can rotate without rewriting old rows in place.

```ts
// CryptoService usage
const encryptedIdNumber = await crypto.encrypt(rawIdNumber, "kek-v1")
await prisma.userIdentity.create({ data: { userId, idNumberCt: encryptedIdNumber, kekId: "kek-v1" } })
```

#### Encryption in transit
- **TLS 1.3** on the public edge, terminated at Cloudflare, re-established to the API. HSTS preload, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- **mTLS or VPC peering** between the API and Postgres / Redis. Never expose the DB or Redis to the public internet.
- All client-side fetches: `credentials: "include"` only on first-party origins.

#### Never logged or cached
- Raw document bytes
- Raw ID/tax numbers (encrypted column never reaches stdout)
- Full JWTs or session cookies
- Supabase service-role key (only in API/worker env, never in CI logs)

### 2.2 File-upload security

#### Pre-signed upload flow (matches `frontend/src/components/jobs/post-job-page.tsx`)
1. Client POSTs `/documents/upload-intent` with `{ filename, mimeType, byteLength, kind }`.
2. API validates `mimeType ∈ allowlist`, `byteLength ≤ 25 MB`, `kind ∈ enum`, throttles per-user.
3. API creates a `Document` row with status `PENDING_UPLOAD`, generates a Supabase Storage signed upload URL scoped to a path like `kyc/{userId}/{documentId}.{ext}`, returns `{ documentId, uploadUrl, headers, expiresIn: 300 }`.
4. Client `PUT`s bytes directly to Supabase Storage. The API never sees the bytes.
5. Client POSTs `/documents/{id}/finalize`. API verifies the object exists, reads its size and content-type, transitions status to `SCANNING`, and enqueues `documents.scan` on BullMQ.

#### File validation (defense in depth)
| Layer | Check |
|---|---|
| DTO | `@IsIn` for kind, `@IsMimeType` for declared type, `@Max(25_000_000)` for byteLength |
| Storage signed URL | `contentType` lock, `maxBytes` enforced by Supabase |
| Worker (post-upload) | `file-type` library on the object stream — rejects if magic bytes don't match the claimed MIME |
| Worker | Image-only kinds: re-encode through `sharp` (strips EXIF + metadata, breaks malicious payloads) |
| Worker | PDF kinds: re-render via `pdf-lib` flatten or pass through ClamAV |

#### Malware scanning
- **In-process**: `clamav` + `clamdscan` in a sidecar container the worker shells out to. Quarantine path = `quarantine/{documentId}` bucket on positive hit; mark `Document.status = INFECTED`, fire an audit event, alert security channel.
- **Hosted**: VirusTotal / Cloudflare R2 + ClamAV-as-a-service. Either way, the upload pipeline blocks completion until a scan result is recorded.

#### Preventing public exposure
- Storage buckets are private (`public = false` in Supabase). No public ACL anywhere.
- Signed-URL TTL is **5 minutes** (uploads and downloads).
- Storage policies (Postgres RLS) double-gate access by `user_id` even if a service-role key leaks.
- The CDN never serves the bucket directly — it proxies signed URLs only.

### 2.3 Access control (RBAC)

Roles (full matrix in §11):
- `admin` — platform staff
- `verifier` — KYC reviewer
- `seller` — supplier or contractor
- `buyer` — homeowner or contractor purchasing
- `system` — internal worker identity

Implementation:
- A `JwtAuthGuard` populates `req.user` from a verified Supabase JWT.
- A `RolesGuard` reads `@Roles('admin', 'verifier')` metadata from the route handler.
- A `DocumentAccessGuard` does fine-grained per-row checks: "is the requesting user the owner OR a verifier assigned to this document OR an admin?"
- DB-side **RLS policies** mirror the same checks — Postgres refuses the row even if the application layer is bypassed.

Signed URLs for downloads:
```
GET /documents/{id}/download
  → guard runs, audit log row written, returns { url, expiresAt: now + 300s }
```
Never return the storage path or object key directly. The client only ever sees the time-bound URL.

### 2.4 Authentication

#### Supabase Auth vs custom JWT — recommendation: **Supabase Auth**

Reasons:
- Battle-tested password hashing (Argon2id), MFA/TOTP, password reset, email verification, magic links — all out of the box.
- Compliance posture: SOC 2 Type II, GDPR DPA from Supabase covers most of the auth surface.
- The Supabase JWT *also* unlocks RLS in Postgres — your DB layer enforces auth, not just your app. Defense in depth.

The Nest API verifies the Supabase JWT using Supabase's JWKS endpoint or the configured JWT secret. A custom `JwtAuthGuard` decodes and validates `aud`, `iss`, `exp`, then loads the user's full role profile from a local `users` table (joined to Supabase's `auth.users` by ID).

```ts
@Injectable()
export class SupabaseJwtGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<Request>()
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) throw new UnauthorizedException()
    const payload = await this.jwt.verify(token, { secret: env.SUPABASE_JWT_SECRET, algorithms: ["HS256"] })
    req.user = await this.users.hydrate(payload.sub) // includes roles, status, mfa_enabled
    return true
  }
}
```

**Why not custom JWT?** Building auth correctly (rotation, revocation, password resets, MFA enrollment, lockout, session inventory) takes weeks. Supabase ships all of it. Escape hatch later: if you outgrow Supabase Auth, both Supabase JWTs and custom Nest JWTs are HS256 — switch the verifier without changing route code.

The frontend `/auth/login` (`frontend/src/components/auth/login-page.tsx`) and `/auth/signup` (`frontend/src/components/auth/signup-page.tsx`) pages are wired to call this directly — they POST email/password to a Nest proxy endpoint that wraps `supabase.auth.signInWithPassword`.

#### MFA support
Supabase Auth supports TOTP. Enforce at the API layer for sensitive routes:
```ts
@UseGuards(SupabaseJwtGuard, MfaRequiredGuard)
@Post('documents/:id/sign')
```
The `MfaRequiredGuard` checks `req.user.mfa_verified_at > now() - 15 min` (re-auth window for sensitive ops).

#### Session & token expiration
- **Access token**: 1 hour
- **Refresh token**: 7 days, rotated on every use, stored httpOnly + secure
- **Sensitive-op re-auth**: 15 minutes (force MFA re-prompt before signing contracts, downloading IDs)
- **Inactivity logout**: 30 minutes for admin/verifier roles

### 2.5 API security

| Threat | Defense |
|---|---|
| **SQL injection** | Prisma — all queries are parametrized; no `$queryRawUnsafe` without explicit security review |
| **XSS** | API only returns JSON; clients are responsible for escaping. CSP header on every response |
| **CSRF** | Stateless JWT in `Authorization` header (not cookie) → CSRF doesn't apply. If you switch to cookie-based sessions, add a `X-CSRF-Token` header check |
| **Brute force** | Redis-backed rate limit per IP + per-account-id on `/auth/login` (5 fails / 15 min) and `/documents/*` (60 / min / user) |
| **Replay attacks** | Idempotency keys on POST endpoints (`Idempotency-Key` header → Redis SETNX 24h) |
| **Mass assignment** | DTOs whitelist fields with `class-validator` + `class-transformer` `excludeExtraneousValues: true` |
| **DOS via large body** | `body-parser` `limit: 1mb` for JSON; uploads go directly to Storage, never through the API |
| **Header injection** | Helmet middleware enabled |
| **Information disclosure** | Custom `AllExceptionsFilter` strips stack traces in production responses; logs them to observability instead |

### 2.6 Audit & compliance

Every action that touches a document is audited. Append-only audit log in its own Postgres schema.

Logged events (non-exhaustive):
- `auth.login`, `auth.login_failed`, `auth.password_changed`, `auth.mfa_enabled`
- `document.uploaded`, `document.scan_completed`, `document.scan_failed`
- `document.viewed`, `document.downloaded` (with signed-URL ID)
- `document.deleted`, `document.retention_purged`
- `admin.role_granted`, `admin.role_revoked`

Each row contains `actor_user_id`, `target_user_id`, `target_resource_type`, `target_resource_id`, `event_type`, `ip`, `user_agent`, `request_id`, `metadata`, `created_at`. Hash-chained (each row's hash includes the previous row's hash) to detect tampering.

Retention:
- Audit logs: 7 years (regulatory minimum varies — confirm jurisdiction)
- Documents: configurable per-kind. KYC IDs default to 5 years post-account-closure
- Soft-deleted user data: hard-deleted after 30 days
- A nightly worker (`audit.retention.purge`) executes scheduled deletions; emits an audit event for each purge

GDPR / data subject requests: a `/me/export` endpoint zips all data tied to a user (DB rows + storage objects) and emails a download link via a worker job.

---

## 3. System Components & Data Flow

### Request lifecycle (HTTP)

```
1. Cloudflare:
   - Terminate TLS, run WAF rules, block known-bad IPs
2. NestJS API:
   - Helmet sets security headers
   - RequestId middleware tags every log line
   - Compression (responses only, NEVER on file streams)
   - Body parser (1mb)
   - CorsMiddleware (allowlisted origins)
   - JwtAuthGuard → req.user
   - RolesGuard → role check
   - ValidationPipe → DTO validation, transform
   - AuditInterceptor → emits audit event for write routes
   - LoggingInterceptor → structured log entry
   - Controller method runs
   - ResponseInterceptor → strips internal fields
   - GlobalExceptionFilter → safe error JSON
3. Nest replies; Cloudflare adds cache headers (NEVER for /documents/*)
```

### Secure document UPLOAD flow (detailed)

```
[Client]                     [API]                       [Supabase Storage]    [Redis/BullMQ]
   │                            │                                  │                    │
   │ POST /documents/upload-intent                                  │                    │
   │ ─────────────────────────► │                                  │                    │
   │                            │ 1. Validate DTO + ratelimit       │                    │
   │                            │ 2. Insert Document(status=PENDING_UPLOAD)              │
   │                            │ 3. Create signed UPLOAD url       │                    │
   │ ◄───────── { documentId, uploadUrl, expiresIn: 300 }            │                    │
   │                            │                                  │                    │
   │ PUT bytes ─────────────────────────────────────────────────► │                    │
   │ ◄──────── 200 OK ─────────────────────────────────────────── │                    │
   │                            │                                  │                    │
   │ POST /documents/{id}/finalize                                 │                    │
   │ ─────────────────────────► │                                  │                    │
   │                            │ 4. HEAD object → confirm exists   │                    │
   │                            │ 5. status=SCANNING                │                    │
   │                            │ 6. enqueue documents.scan ─────────────────────────► │
   │ ◄──── 202 Accepted ─────── │                                  │                    │
   │                            │                                  │                    │
   │  ───── Polling /documents/{id} or SSE notification ─────────────────────────────► │
   │                            │                                  │   [Worker pulls]    │
   │                            │                                  │ ─ stream object ─► │
   │                            │                                  │ ◄ scan + validate │
   │                            │ 7. Worker → status=READY|INFECTED                      │
   │                            │ 8. Worker → audit event           │                    │
```

### Secure document DOWNLOAD flow

```
1. Client GET /documents/{id}/download (Authorization: Bearer ...)
2. JwtAuthGuard → req.user
3. DocumentAccessGuard:
   - SELECT * FROM documents WHERE id = $1
   - Check ownership OR assigned-verifier OR admin role
   - If denied: 403, audit document.access_denied
4. Issue signed download URL (300s TTL, content-disposition: attachment)
5. Audit document.viewed { actor, target, signed_url_id, ip, ua }
6. Return { url, expiresAt }
7. Client fetches the URL directly from Storage (single GET; URL invalid after TTL)
```

---

## 4. NestJS project structure

```
backend/
├── src/
│   ├── main.api.ts              ← HTTP entrypoint
│   ├── main.worker.ts           ← BullMQ worker entrypoint
│   ├── app.module.ts            ← root for HTTP
│   ├── worker.module.ts         ← root for worker
│   ├── config/
│   │   ├── env.schema.ts        ← zod-validated env
│   │   ├── supabase.config.ts
│   │   └── redis.config.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   ├── current-user.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── guards/
│   │   │   ├── supabase-jwt.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   ├── mfa-required.guard.ts
│   │   │   └── document-access.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── audit.interceptor.ts
│   │   │   └── response.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   ├── filters/
│   │   │   └── all-exceptions.filter.ts
│   │   ├── middleware/
│   │   │   ├── request-id.middleware.ts
│   │   │   ├── helmet.middleware.ts
│   │   │   └── rate-limit.middleware.ts
│   │   └── crypto/
│   │       ├── crypto.service.ts        ← field-level encryption
│   │       └── kek.service.ts           ← key-encryption-key rotation
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── documents/                   ← see §5.3
│   │   ├── audit/
│   │   ├── notifications/
│   │   └── admin/
│   ├── workers/
│   │   ├── documents/
│   │   │   ├── document-scan.processor.ts
│   │   │   └── document-retention.processor.ts
│   │   ├── notifications/
│   │   │   └── email-notification.processor.ts
│   │   └── audit/
│   │       └── audit-fan-out.processor.ts
│   └── prisma/
│       ├── prisma.service.ts
│       └── prisma.module.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.worker
│   └── docker-compose.yml
└── package.json
```

### Layer responsibilities

| Layer | Owns |
|---|---|
| Controller | HTTP shape: routes, DTOs, status codes. Zero business logic |
| Service | Business logic, transactions, calls to other services |
| Repository (optional) | Direct Prisma calls if you want to test services without a DB |
| Guard | Authn/Authz decisions. Returns boolean, never mutates |
| Interceptor | Cross-cutting: logging, audit, response shaping |
| Pipe | Input transformation + validation (DTOs) |
| Middleware | Per-request setup: request IDs, security headers, ratelimit |
| Filter | Centralized error handling |

---

## 5. Core modules

### 5.1 `AuthModule`

Endpoints (mostly proxies to Supabase Auth — these are the endpoints `frontend/src/components/auth/*` will call):

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/signup` | Create Supabase user, send verification email |
| POST | `/auth/login` | Exchange password for tokens (rate-limited) |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate refresh token in Redis blocklist |
| POST | `/auth/mfa/enroll` | Begin TOTP enrollment |
| POST | `/auth/mfa/verify` | Confirm TOTP and mark `mfa_enabled` |
| POST | `/auth/password/forgot` | Trigger reset email |
| POST | `/auth/password/reset` | Complete reset |

### 5.2 `UsersModule`

- `User` profile data joined to Supabase's `auth.users` by `id`
- `UserRole` mapping (one user → many roles)
- `/me`, `/me/profile`, `/me/export` (GDPR), `/me/delete` (soft + scheduled hard)

### 5.3 `DocumentsModule` — the heart of the system

```ts
@Module({
  imports: [BullModule.registerQueue({ name: 'documents.scan' }), PrismaModule, AuditModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    SignedUrlService,         // wraps Supabase Storage SDK
    DocumentAccessGuard,
    DocumentScanProcessor,    // imported into worker.module.ts only
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
```

Endpoints:

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/documents/upload-intent` | any authenticated | Step 1: validate, return signed upload URL |
| POST | `/documents/:id/finalize` | owner | Step 2: confirm bytes uploaded, enqueue scan |
| GET | `/documents/:id` | owner / verifier / admin | Status + metadata (no URL) |
| GET | `/documents/:id/download` | owner / verifier / admin | Signed download URL |
| DELETE | `/documents/:id` | owner / admin | Soft-delete; worker hard-deletes after retention |
| GET | `/documents/me` | any authenticated | List my documents |
| GET | `/admin/documents` | admin / verifier | Paginated list across all users |

Service responsibilities:
- `createUploadIntent(userId, dto)` — validate, insert row, request signed URL
- `finalizeUpload(userId, documentId)` — confirm, enqueue scan
- `getDownloadUrl(userId, documentId)` — RBAC, audit, sign
- `softDelete`, `hardPurge` (scheduled)

### 5.4 `NotificationsModule` (BullMQ-driven)

Channels: email (Resend / SES), SMS (Twilio), in-app feed.

Producer side (in any service):
```ts
await this.notificationsQueue.add('document.scan_completed', {
  userId, documentId, status,
}, { attempts: 5, backoff: { type: 'exponential', delay: 5000 }, removeOnComplete: true })
```

Worker side (in worker process): `EmailNotificationProcessor`, `InAppNotificationProcessor`.

### 5.5 `AuditModule`

```ts
@Injectable()
export class AuditService {
  async log(event: AuditEvent): Promise<void> {
    // 1. Compute hash chain: sha256(prevHash || canonical(event))
    // 2. Insert into audit_log table inside the same transaction as the action
    // 3. Fire-and-forget enqueue to audit.fanout queue for SIEM forwarding
  }
}
```

`AuditInterceptor` wraps every state-changing route and calls `AuditService.log` automatically with `{ actor, route, params, result_status }`.

---

## 6. Queue & background jobs

### Queues

| Queue | Concurrency | Backoff | DLQ |
|---|---|---|---|
| `documents.scan` | 4 | exp, 5s base, 5 attempts | `documents.scan.dlq` |
| `documents.retention` | 1 | linear, daily cron | n/a |
| `notifications.email` | 16 | exp, 2s base, 5 attempts | `notifications.email.dlq` |
| `audit.fanout` | 8 | exp, 1s base, 10 attempts | `audit.fanout.dlq` |

### Patterns
- **Idempotent processors**: every job carries an `idempotencyKey` (often the resource id + state); processor short-circuits if already done
- **Dead-letter queues**: jobs that exhaust retries land in `<queue>.dlq`. A nightly cron emits a digest to ops + counts to Prometheus
- **Failure handling**: `@OnQueueFailed()` listener writes an audit event and bumps a Prometheus counter
- **Repeatable jobs**: cron-style, registered at boot (`documents.retention` runs at 03:00 UTC daily)
- **Graceful shutdown**: workers receive `SIGTERM`, finish in-flight jobs (capped at 60s), then exit

### Why BullMQ over raw Redis pubsub or DB-as-queue
- Built-in retry/backoff/DLQ
- Job lock prevents duplicate processing across replicas
- Bull-board for human-friendly debugging (gated behind admin-only auth)

---

## 7. Database & data modeling

### Core Prisma schema (excerpt)

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum UserRole { ADMIN VERIFIER SELLER BUYER SYSTEM }
enum DocumentKind { GOVT_ID PROOF_OF_ADDRESS BUSINESS_PERMIT CONTRACT OTHER }
enum DocumentStatus { PENDING_UPLOAD SCANNING READY INFECTED REJECTED DELETED }

model User {
  id            String   @id              // matches auth.users.id from Supabase
  email         String   @unique
  fullName      String
  mfaEnabled    Boolean  @default(false)
  status        String   @default("active")  // active|suspended|deleted
  createdAt     DateTime @default(now())
  roles         UserRoleAssignment[]
  documents     Document[]
  identities    UserIdentity[]
  @@index([email])
}

model UserRoleAssignment {
  id       String   @id @default(cuid())
  userId   String
  role     UserRole
  grantedAt DateTime @default(now())
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, role])
}

// Field-level encrypted columns
model UserIdentity {
  id            String   @id @default(cuid())
  userId        String
  idNumberCt    Bytes                       // ciphertext, encrypted with KEK
  idNumberHash  String                      // HMAC-SHA256 for lookup, no plaintext
  kekId         String                      // which key encrypted this row
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([idNumberHash])
}

model Document {
  id              String          @id @default(cuid())
  userId          String          // owner
  kind            DocumentKind
  status          DocumentStatus  @default(PENDING_UPLOAD)
  storageBucket   String
  storagePath     String          // kyc/{userId}/{id}.{ext}
  mimeType        String
  byteLength      Int
  sha256          String?
  scanResult      String?
  scanFinishedAt  DateTime?
  uploadedAt      DateTime?
  deletedAt       DateTime?
  retentionUntil  DateTime?
  createdAt       DateTime        @default(now())
  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessLog       DocumentAccess[]
  @@index([userId, status])
  @@index([retentionUntil])
}

model DocumentAccess {
  id           String   @id @default(cuid())
  documentId   String
  actorUserId  String
  action       String   // viewed|downloaded|denied
  ip           String
  userAgent    String?
  signedUrlId  String?
  createdAt    DateTime @default(now())
  document     Document @relation(fields: [documentId], references: [id], onDelete: Cascade)
  @@index([documentId, createdAt])
  @@index([actorUserId, createdAt])
}

model AuditLog {
  id              String   @id @default(cuid())
  actorUserId     String?
  targetUserId    String?
  targetResource  String?  // "document" | "user" | "auth" ...
  targetResourceId String?
  eventType       String
  ip              String?
  userAgent       String?
  requestId       String?
  metadata        Json?
  prevHash        String?
  hash            String   // sha256(prevHash || canonicalize(this row))
  createdAt       DateTime @default(now())
  @@index([actorUserId, createdAt])
  @@index([eventType, createdAt])
  @@index([targetResource, targetResourceId])
}
```

### Performance & indexing
- All foreign keys have a backing index (Prisma's default)
- Composite indexes on `(userId, status)` for "my pending docs" and `(retentionUntil)` for the retention sweep
- Pagination via cursor on `(createdAt, id)` — never `OFFSET` on large tables
- Partial indexes for hot subsets: `CREATE INDEX ON documents(userId) WHERE status = 'READY';`

### RLS as defense in depth
Every user-facing table has an RLS policy:
```sql
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_can_select" ON documents
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "verifier_can_select" ON documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_role_assignments
            WHERE user_id = auth.uid() AND role IN ('VERIFIER','ADMIN'))
  );
```
The Nest API connects with a role-scoped JWT so RLS applies. The worker uses the service-role key (RLS bypass) only inside transactions it controls.

---

## 8. Caching strategy (Redis)

### What we cache (and TTLs)

| Key | Value | TTL | Why |
|---|---|---|---|
| `user:{id}:profile` | minimal user object | 5 min | Avoid hot read for `/me` |
| `user:{id}:roles` | role array | 5 min | Hot path on every guarded request |
| `ratelimit:{ip}:{route}` | counter | 1 min sliding | Rate limiting |
| `ratelimit:{userId}:auth.login` | counter | 15 min | Brute-force on login |
| `idempotency:{key}` | response hash | 24 h | Replay protection |
| `signed_url:{documentId}:{actorId}` | url + meta | 4 min | Reuse a recently-issued URL within window |
| `auth:revoked:{jti}` | "1" | until token exp | JWT revocation list |

### What we **never** cache
- Document bytes
- Plaintext PII (ID numbers, addresses) — they live encrypted in DB only
- Full JWTs (only their `jti` for revocation)
- Anything covered by a "right to be forgotten" obligation, unless the cache is keyed by a userId we can purge in one operation

### Invalidation
- Profile/roles: TTL + explicit `DEL` on update
- Document caches: invalidated by status transitions
- Bulk purge command on user deletion: `DEL user:{id}:*` via SCAN

---

## 9. Scalability & reliability

| Property | Approach |
|---|---|
| **Stateless API** | No in-memory session; everything goes through Redis or DB. Replicas can be added behind the LB without sticky sessions |
| **Horizontal scaling** | API and worker scale independently. API scales on RPS; worker on queue depth |
| **Connection pooling** | Use Supabase's pooler (PgBouncer transaction mode). Prisma `connection_limit` per replica = 10–20; total ≤ DB max - headroom |
| **Backpressure** | BullMQ rate limit per queue protects downstream services (e.g., scanner) |
| **Retry budgets** | Per-call retries are idempotent; per-job retries are capped + DLQ |
| **Concurrency safety** | Optimistic locking on `Document.status` transitions (compare-and-swap) so two finalize calls can't double-enqueue |
| **Graceful degradation** | If Redis is down: cache misses become DB hits; rate limit fails open with a flagged warning; background jobs queue up in memory until Redis returns (with a max buffer) |
| **Health checks** | `/healthz` (liveness), `/readyz` (DB + Redis ping). Workers expose a separate metrics endpoint |
| **Zero-downtime deploys** | Rolling, with `preStop` SIGTERM handler that drains in-flight HTTP and BullMQ jobs |

---

## 10. DevOps & deployment

### Docker

```yaml
# docker-compose.yml (local dev)
services:
  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
  api:
    build: { context: ., dockerfile: docker/Dockerfile.api }
    env_file: .env.local
    depends_on: [redis]
    ports: ["3000:3000"]
  worker:
    build: { context: ., dockerfile: docker/Dockerfile.worker }
    env_file: .env.local
    depends_on: [redis]
```

`Dockerfile.api` (sketch):
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app package.json prisma ./
USER app
HEALTHCHECK CMD wget -qO- http://localhost:3000/healthz || exit 1
CMD ["node", "dist/main.api.js"]
```

### CI/CD (GitHub Actions outline)
1. **lint + typecheck + test** on every PR
2. **prisma migrate diff** to detect drift
3. **build + push** Docker images on merge to main, tagged with commit SHA
4. **deploy** to staging via ArgoCD / Render / Fly / Railway, smoke test
5. **manual approval** for production
6. **prisma migrate deploy** as a one-shot job before swapping API replicas

### Secrets management
- **Local**: `.env.local` (gitignored)
- **CI**: GitHub Actions secrets, OIDC-federated to cloud provider — no long-lived service-account keys
- **Runtime**: cloud secret manager (AWS Secrets Manager / GCP SM / Doppler), mounted at boot. Rotation enabled
- Never commit Supabase service-role key, JWT secret, or KEK material. CI scanning (gitleaks) blocks PRs that contain detected secrets

### Monitoring & alerting
- **Tracing**: OpenTelemetry → Tempo / Honeycomb
- **Metrics**: Prometheus (Nest `@willsoto/nestjs-prometheus`) → Grafana
- **Logs**: structured JSON via pino → Loki / Datadog
- **Critical alerts**:
  - 5xx rate > 1% over 5 min
  - Auth login failure rate spike (anomaly)
  - DLQ depth > 0 sustained for 15 min
  - `documents.scan` p95 > 30s
  - `audit_log` insert failure (this is a **page**)
- **Security alerts**: any `auth.mfa_disabled` by admin acting on another user → instant Slack + email

---

## 11. User roles & API surface

### Role matrix

| Capability | Buyer | Seller | Verifier | Admin |
|---|:---:|:---:|:---:|:---:|
| Browse marketplace | ✅ | ✅ | ✅ | ✅ |
| Place orders | ✅ | ✅ | — | ✅ |
| List products / services | — | ✅ | — | ✅ |
| Upload own KYC docs | ✅ | ✅ | ✅ | ✅ |
| View own KYC docs | ✅ | ✅ | ✅ | ✅ |
| Review pending KYC | — | — | ✅ | ✅ |
| Read other users' KYC docs | — | — | ✅ (assigned only) | ✅ |
| Hard-delete a document | — | — | — | ✅ |
| Modify role assignments | — | — | — | ✅ |
| Read audit logs | — | — | own actions | ✅ |

### Document API surface (recap)

```
POST   /documents/upload-intent          (any auth)
POST   /documents/:id/finalize           (owner)
GET    /documents/:id                    (owner | verifier-assigned | admin)
GET    /documents/:id/download           (owner | verifier-assigned | admin)
DELETE /documents/:id                    (owner | admin)
GET    /documents/me                     (any auth)

GET    /admin/documents                  (admin | verifier)
POST   /admin/documents/:id/review       (admin | verifier)
POST   /admin/documents/:id/reject       (admin | verifier)
GET    /admin/audit                      (admin)

GET    /me                               (any auth)
GET    /me/export                        (any auth)
DELETE /me                               (any auth)
```

### What's NOT in v1

To keep scope focused, the following are explicit non-goals for the first release. Each can be added without rearchitecture:
- Microservice extraction of document scanning
- Multi-region active-active
- Customer-managed encryption keys (BYOK) for enterprise tenants
- Real-time push via WebSockets (use polling + SSE for upload status v1)
- Self-hosted SIEM (forward to managed in v1)

---

## Appendix A — Threat model summary

| Asset | Adversary | Mitigation |
|---|---|---|
| Govt ID document | Other authenticated user | Per-row RLS + DocumentAccessGuard + signed URLs only |
| Govt ID document | External attacker | Private bucket, no public ACLs, TLS, WAF |
| ID number (in DB) | DB dump leak | Field-level encryption with KEK in cloud KMS |
| Auth token | XSS in frontend | httpOnly refresh, short-lived access, CSP |
| Auth token | Stolen device | MFA + sensitive-op re-auth + revocation list |
| Audit trail | Insider tampering | Hash-chained audit log + offsite forwarding |
| Service-role key | CI leak | OIDC federation, never in env files in repo |
| Document scanning bypass | Crafted PDF | re-render through pdf-lib + ClamAV |

## Appendix B — Bootstrap checklist (week 1–2)

- [ ] Create `backend/` Nest workspace with `nest new`
- [ ] Add `prisma`, `bullmq`, `@nestjs/bullmq`, `class-validator`, `helmet`, `pino`
- [ ] Wire Supabase: client init, JWT verification, Storage SDK
- [ ] Implement `SupabaseJwtGuard` + `RolesGuard` with smoke tests
- [ ] First migration: `User`, `UserRoleAssignment`, `Document`, `AuditLog`
- [ ] `DocumentsModule` upload-intent + finalize end-to-end
- [ ] BullMQ `documents.scan` worker w/ ClamAV sidecar
- [ ] Redis-based rate-limit middleware
- [ ] CI: lint + typecheck + test + Docker build
- [ ] Docker compose up locally with Supabase shadow DB
- [ ] First deploy to staging, run penetration smoke (OWASP ZAP baseline)
