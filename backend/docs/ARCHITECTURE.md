# STRUKTURA Backend — Technical Architecture

> NestJS modular monolith for the STRUKTURA construction marketplace platform. Initial slice: Authentication + Role-Based Onboarding.

---

## 1. Overview

The backend is a single deployable NestJS application organized as a **modular monolith** following **Clean Architecture**, **Domain-Driven Design (DDD)**, and **CQRS** principles. Each domain module is internally layered so it can be extracted into a separate service in the future without rewriting the domain or application layers.

This document covers the implementation currently in `src/`: the `auth`, `users`, and `onboarding` modules plus the shared kernel. Subsequent modules (marketplace, orders, projects, escrow, messaging) will follow the same patterns.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (TypeScript 5.7) |
| Framework | NestJS 11 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Supabase) |
| Authentication | Supabase Auth (JWT, OAuth, email/password) |
| JWT verification | `jose` library (HS256 with Supabase JWT secret) |
| Validation | `class-validator` + `class-transformer` + `zod` (env) |
| CQRS | `@nestjs/cqrs` |
| Logging | `nestjs-pino` (structured JSON) |
| Rate limiting | `@nestjs/throttler` |
| Security headers | `helmet` |
| Background jobs | _(planned)_ BullMQ + Redis (Upstash) |
| Caching | _(planned)_ Redis |
| Storage | _(planned)_ Supabase Storage |
| Process manager | _(deployment)_ Docker + PM2 / Railway |

---

## 3. Architectural Style

### Modular Monolith
One process, many modules. Modules communicate via the CQRS `CommandBus` / `QueryBus` / `EventBus` — never via direct service imports across module boundaries. This isolation lets us split a module into its own service later without dependency surgery.

### Clean Architecture + DDD + CQRS
Each module has five internal layers:

```
modules/<name>/
├── domain/          Pure business model (entities, VOs, events, repo interfaces, exceptions)
├── application/     Use cases (commands, queries, handlers, ports)
├── persistence/     Prisma repository implementations + mappers
├── infrastructure/  External adapters (Supabase, queues, email, etc.)
├── presentation/    HTTP controllers, DTOs, guards, decorators
└── <name>.module.ts NestJS wiring
```

### Dependency Rule (strict)

```
presentation  →  application  →  domain
                      ↑
                persistence  →  domain
                infrastructure  →  application (ports only)
```

- **Domain** depends on nothing. No NestJS, no Prisma, no SDKs.
- **Application** depends on domain + port interfaces only. No Prisma, no SDKs.
- **Persistence** depends on domain (implements repository interfaces) + Prisma.
- **Infrastructure** depends on application ports + external SDKs (Supabase, BullMQ, email).
- **Presentation** depends on application (dispatches Commands/Queries) + thin DTO mapping.

Violations to watch for:
- `import { PrismaService }` inside `application/` or `domain/` — forbidden.
- `import { createClient } from '@supabase/supabase-js'` outside `infrastructure/` — forbidden.
- Returning Prisma model objects from a controller — forbidden (use response DTOs).

---

## 4. Folder Layout

```
backend/
├── prisma/
│   ├── schema.prisma                 # All models & enums
│   └── migrations/                    # (generated)
├── prisma.config.ts                   # Prisma 7 datasource binding
├── src/
│   ├── main.ts                        # Bootstrap (helmet, validation, pino, CORS)
│   ├── app.module.ts                  # Composition root
│   ├── config/
│   │   └── env.schema.ts              # zod env validator (fails fast)
│   ├── shared/
│   │   ├── domain/exceptions/         # NotFound, Conflict, Unauthorized, Forbidden, Validation, BadRequest
│   │   ├── application/ports/         # AuditLoggerPort
│   │   ├── infrastructure/
│   │   │   ├── prisma/                # PrismaService (global) + PrismaModule
│   │   │   ├── filters/               # GlobalExceptionFilter (RFC 9457 ProblemDetails)
│   │   │   └── audit/                 # AuditLoggerAdapter + event subscribers
│   │   └── presentation/decorators/   # @Public, @Roles, @CurrentUser
│   └── modules/
│       ├── auth/                      # Sign-up, login, JWT, OAuth, password reset, webhooks
│       ├── users/                     # User entity, role assignment, /users/me
│       └── onboarding/                # Per-role onboarding wizard + admin approval
└── docs/
    └── ARCHITECTURE.md                # This file
```

---

## 5. Module Catalog

| Module | Responsibility | Key endpoints |
|---|---|---|
| **auth** | Supabase identity bridge; JWT verification; signup/login/refresh/logout; OAuth callback; password reset; email-verified webhook | `/auth/signup`, `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/oauth/callback`, `/auth/password-reset/{request,confirm}`, `/auth/webhooks/email-verified` |
| **users** | Internal user record; role/permission assignment; current-user lookup | `GET /users/me` |
| **onboarding** | Per-role onboarding state machine; profile collection; admin approval workflow | `POST /onboarding/:role/start`, `GET /onboarding/:role`, `PATCH /onboarding/:role/step`, `POST /onboarding/:role/submit`, `GET /admin/onboarding/pending`, `POST /admin/onboarding/:id/{approve,reject}` |
| **shared/audit** | Append-only audit trail; subscribes to domain events and writes `AuditLog` rows | — (internal) |

All endpoints are prefixed with `/api/v1`.

---

## 6. Data Model

Defined in `prisma/schema.prisma`.

### Enums
- `Role`: `CLIENT | CONTRACTOR | SUPPLIER | JOB_SEEKER | ADMIN | MODERATOR | SUPPORT`
- `OnboardingStatus`: `NOT_STARTED | IN_PROGRESS | PENDING_VERIFICATION | COMPLETED | REJECTED`
- `UserStatus`: `ACTIVE | SUSPENDED | DELETED`
- `VerificationLevel`: `UNVERIFIED | IDENTITY | LICENSE | PORTFOLIO | TOP_RATED`

### Tables

| Table | Purpose |
|---|---|
| `User` | Internal user; linked to Supabase via `supabaseAuthId` |
| `UserRole` | Many-to-many; a user may hold multiple roles (Client + Contractor + Supplier) |
| `OnboardingState` | One row per (user, role); tracks progress through wizard steps; stores partial form data in a `Json` column |
| `ClientProfile` / `ContractorProfile` / `SupplierProfile` / `JobSeekerProfile` | Role-specific profile data; populated on submit / approval |
| `AuditLog` | Append-only audit trail (signup, login, logout, role assigned, etc.) |

### Multi-role support
`UserRole` is a junction table with a `@@unique([userId, role])` constraint. A user can onboard for each role independently; each onboarding creates a separate `OnboardingState`. Internal roles (`ADMIN`, `MODERATOR`, `SUPPORT`) cannot self-onboard — they are provisioned by an existing admin.

---

## 7. Request Flow

A typical authenticated `POST /onboarding/CLIENT/start` request:

```
HTTP Request
  ↓
ThrottlerGuard           ← global rate limit (configurable per route)
  ↓
SupabaseJwtGuard         ← extracts Bearer token, verifies via JWKS / HS256
  ↓                       loads internal user from DB, attaches req.user
EmailVerifiedGuard       ← rejects if emailVerifiedAt is null
  ↓
RolesGuard (if used)     ← enforces @Roles() metadata
  ↓
ValidationPipe (global)  ← class-validator on request DTO
  ↓
Controller method        ← thin: maps DTO → Command, returns Response DTO
  ↓
CommandBus.execute(cmd)  ← @nestjs/cqrs dispatch
  ↓
CommandHandler           ← orchestrates use case
  ↓
Domain Entity            ← enforces invariants (state machine, business rules)
  ↓
Repository (interface)   ← persistence boundary
  ↓
Prisma Repository (impl) ← Prisma client, mapper to/from domain
  ↓
PostgreSQL
  ↓
(Return path)
Domain object → Mapper → Response DTO → JSON
```

Errors thrown at any layer are caught by `GlobalExceptionFilter` and serialized as RFC 9457 ProblemDetails (see §10).

---

## 8. Authentication

### Identity split
- **Supabase Auth** owns: email, password hash, email verification flow, password reset emails, OAuth (Google + Facebook), JWT issuance, refresh tokens.
- **NestJS backend** owns: internal `User` row, roles, permissions, profile data, onboarding state, business authorization.
- **Link**: `User.supabaseAuthId` ↔ Supabase `auth.users.id`.

### Sign-up flow
```
POST /auth/signup
  → AuthController.signup
  → SignupCommand → SignupHandler:
      1. AuthProviderPort.signupWithPassword()
         → SupabaseAuthAdapter.signUp() (Supabase sends verification email)
      2. CommandBus → SyncSupabaseUserCommand (creates internal User, emailVerifiedAt=null)
      3. EventBus.publish(UserSignedUpEvent) → AuditLog
  → 201 { userId, email, emailVerified: false, message }
```

### Email verification
Supabase Auth Hooks POST to `/auth/webhooks/email-verified` with header `x-webhook-secret: <SUPABASE_WEBHOOK_SECRET>`. Backend verifies the secret using `timingSafeEqual` to defeat timing attacks, then dispatches `MarkEmailVerifiedCommand` to update `User.emailVerifiedAt`.

`EmailVerifiedGuard` blocks any protected route when `emailVerifiedAt` is null.

### Login flow
```
POST /auth/login
  → LoginCommand → LoginHandler:
      1. AuthProviderPort.loginWithPassword() → access + refresh tokens
      2. QueryBus → GetUserBySupabaseIdQuery (load or sync internal user)
      3. Reject if status != ACTIVE          → 403 AccountSuspended
      4. Reject if emailVerifiedAt is null   → 403 EmailNotVerified
      5. CommandBus → RecordLoginCommand (lastLoginAt, lastLoginIp)
      6. EventBus.publish(UserLoggedInEvent) → AuditLog
  → 200 { accessToken, refreshToken, expiresAt, user }
```

### JWT verification (every protected request)
`SupabaseJwtGuard`:
1. Extract `Authorization: Bearer <token>`.
2. Verify HS256 signature against `SUPABASE_JWT_SECRET` via `jose.jwtVerify`.
3. Validate `exp`, extract `sub` (Supabase auth id) and `email_verified` claim.
4. Load internal user via `QueryBus → GetUserBySupabaseIdQuery`.
5. Attach `{ id, supabaseAuthId, email, emailVerifiedAt, roles[] }` to `request.user`.
6. Any failure → 401 with ProblemDetails.

A short-TTL Redis cache for the user lookup is planned to avoid a DB hit on every request.

### OAuth (Google + Facebook)
Supabase handles the OAuth redirect dance. The frontend receives the Supabase session and posts the `access_token` to `POST /auth/oauth/callback`. Backend verifies the token, ensures an internal user exists (create-if-missing), records the login, and returns the synchronized user.

### Refresh token
`POST /auth/refresh { refreshToken }` → `SupabaseAuthAdapter.refreshSession()` → returns new access + refresh pair.

### Password reset
- `POST /auth/password-reset/request { email }` — Supabase sends the reset email. Response is always `202 Accepted` to avoid leaking which addresses are registered.
- `POST /auth/password-reset/confirm { accessToken, newPassword }` — accepts the recovery token from the reset link, sets the session via the Supabase SDK, and updates the password.

### Sign-out
`POST /auth/logout` — revokes the Supabase session (refresh tokens invalidated) and emits `UserLoggedOutEvent`. JWT access tokens are stateless and remain valid until expiry; for fully stateless revocation we would need a deny-list keyed by `jti`, which is deferred.

### Rate limits
Auth endpoints have stricter throttler configs than the global default:
- `/auth/signup`, `/auth/login`: 5 req/min/IP
- `/auth/password-reset/request`: 3 req/min/IP
- `/auth/refresh`: 30 req/min/IP
- `/auth/oauth/callback`: 20 req/min/IP

### MFA
Out of scope for v1. Hook points are in place: `verifyAccessToken` already extracts `app_metadata` / `user_metadata`, which Supabase populates with MFA claims when enabled. Adding an `MfaRequiredGuard` later is straightforward.

---

## 9. Onboarding

Each user starts post-signup with **no business roles**. They onboard for each desired role independently. Internal staff (ADMIN/MODERATOR/SUPPORT) are not allowed through the public onboarding path.

### State machine
Defined in `OnboardingState` aggregate (`modules/onboarding/domain/entities/onboarding-state.entity.ts`). Transitions:

```
       NOT_STARTED
            │
       (start)
            ▼
       IN_PROGRESS
            │
       (saveStep) ──────► IN_PROGRESS (loop until all required steps captured)
            │
       (submit)
            │
            ├─── Client/JobSeeker ─────────────────► COMPLETED  → AssignRoleCommand
            │
            └─── Contractor/Supplier ──────────────► PENDING_VERIFICATION
                                                          │
                                          ┌───────────────┼────────────────┐
                                          │                                │
                                    (admin approve)                  (admin reject)
                                          ▼                                ▼
                                      COMPLETED                        REJECTED
                                          │
                                          ▼
                                  AssignRoleCommand
```

### Steps per role
Defined in `modules/onboarding/domain/value-objects/onboarding-steps.ts`:

| Role | Steps | Approval gate |
|---|---|---|
| `CLIENT` | `PERSONAL_INFO` → `PREFERENCES` | Auto-complete |
| `JOB_SEEKER` | `PERSONAL_INFO` → `SKILLS` → `PREFERENCES` | Auto-complete |
| `CONTRACTOR` | `PERSONAL_INFO` → `TRADE_PROFILE` → `DOCUMENTS` → `PORTFOLIO` | Admin approval |
| `SUPPLIER` | `PERSONAL_INFO` → `BUSINESS_INFO` → `DOCUMENTS` → `PAYOUT_INFO` | Admin approval |

### Storage strategy
- Partial step data is collected in `OnboardingState.data` (a `Json` column), keyed by step name.
- On submit, `ProfileInputBuilder` projects the accumulated blob into a strongly-typed `ProfileInput` and `ProfileRepository.upsertProfile` writes the role-specific profile row (`ClientProfile`, `ContractorProfile`, etc.).
- Role is granted via `AssignRoleCommand`, either immediately (auto-complete roles) or after admin approval.

### Admin endpoints
- `GET /admin/onboarding/pending` — lists all `PENDING_VERIFICATION` states for review.
- `POST /admin/onboarding/:id/approve` — transitions to `COMPLETED`, fires `AssignRoleCommand`.
- `POST /admin/onboarding/:id/reject { reason }` — transitions to `REJECTED` with reason.

Guarded by `@Roles('ADMIN', 'MODERATOR')` via `RolesGuard`.

---

## 10. Error Handling

`shared/infrastructure/filters/global-exception.filter.ts` is the only place HTTP responses are shaped for errors. Response contract: **RFC 9457 ProblemDetails** with `Content-Type: application/problem+json`.

```json
{
  "type": "https://httpstatuses.com/404",
  "title": "RESOURCE_NOT_FOUND",
  "status": 404,
  "detail": "User abc123 not found",
  "traceId": "9f1c7e10-...",
  "errors": { "fieldName": ["validation message"] }
}
```

`errors` is present only on validation failures (`ValidationException` from class-validator).

### Exception → HTTP map

| Source exception | HTTP | `title` |
|---|---|---|
| `NotFoundException` (domain) | 404 | `RESOURCE_NOT_FOUND` |
| `ConflictException` (domain) | 409 | `CONFLICT` |
| `UnauthorizedException` (domain) | 401 | `UNAUTHORIZED` |
| `ForbiddenException` (domain) | 403 | `FORBIDDEN` |
| `ValidationException` (domain) | 400 | `VALIDATION_FAILED` |
| `BadRequestException` (domain) | 400 | `BAD_REQUEST` |
| Prisma `P2002` (unique violation) | 409 | `CONFLICT` |
| NestJS `HttpException` (from validation pipe, throttler) | passthrough | per-status code |
| Anything else | 500 | `INTERNAL_SERVER_ERROR` |

5xx logged at `ERROR` with stack trace. 4xx logged at `WARN`.

### Domain-specific subtypes
- `InvalidCredentialsException` → 401
- `EmailNotVerifiedException` → 403
- `AccountSuspendedException` → 403
- `EmailAlreadyRegisteredException` → 409
- `InvalidTokenException` → 401
- `WebhookSignatureInvalidException` → 401
- `OnboardingNotFoundException` → 404
- `OnboardingAlreadyCompletedException` → 409
- `OnboardingNotReadyException` → 400
- `InvalidStepException` → 400
- `InvalidRoleForPublicOnboardingException` → 400

All subtypes extend the generic domain exceptions, so the filter only needs to know about the base types — adding new domain exceptions does not require filter changes.

---

## 11. Logging

`nestjs-pino` provides structured JSON logging. Configured in `app.module.ts`.

- **Dev mode**: pretty-printed single-line logs via `pino-pretty`.
- **Prod mode**: raw JSON for downstream aggregation (Loki, Datadog, etc.).
- **Redaction**: `req.headers.authorization`, `req.headers.cookie`, `req.body.password`, `req.body.newPassword`, `req.body.accessToken`, `req.body.refreshToken`, and the same fields on responses. Replaced with `[REDACTED]`.
- **Log levels** per response status: 5xx → `error`, 4xx → `warn`, others → `info`.
- **Trace ID**: pino-http auto-generates `req.id` per request; the global filter echoes it back as `traceId` in error responses.

Audit logging is separate from request logging — see §12.

---

## 12. Audit Trail

`AuditLog` table is append-only. Writes happen through `AuditLoggerPort` implemented by `AuditLoggerAdapter` (Prisma-backed). The adapter swallows write errors after logging them, so an audit failure can never break a parent request.

### Event subscribers
The audit module registers `@EventsHandler` subscribers on the CQRS `EventBus`:

| Event | Action |
|---|---|
| `UserSignedUpEvent` | `USER_SIGNED_UP` |
| `UserLoggedInEvent` | `USER_LOGGED_IN` |
| `UserLoggedOutEvent` | `USER_LOGGED_OUT` |
| `RoleAssignedEvent` | `ROLE_ASSIGNED` |
| `UserCreatedEvent` | `USER_CREATED` |

Adding a new audit event = define a domain event in the appropriate module, publish it from the command handler, and add a corresponding `@EventsHandler` in `shared/infrastructure/audit/event-handlers/`. No changes to the publisher.

### Fields captured
`actorUserId`, `actorRole`, `action`, `entityType`, `entityId`, `oldValues`, `newValues`, `ipAddress`, `userAgent`, `traceId`, `metadata`, `createdAt`.

### Future additions
- Failed login attempts (no `actorUserId`, includes attempted email + IP).
- Onboarding `submit` / `approve` / `reject` events.
- Role revocation.
- Password reset confirmation.

---

## 13. Configuration

### Env validation
`src/config/env.schema.ts` validates env vars on startup with zod. Missing or malformed values fail-fast at bootstrap. The full required set is documented in `backend/.env.example`.

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` \| `staging` \| `production` \| `test` |
| `PORT` | HTTP port (default 3000) |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `DATABASE_URL` | Pooled Supabase Postgres URL (pgbouncer, port 6543) — used at runtime |
| `DIRECT_URL` | Direct Supabase Postgres URL (port 5432) — used by Prisma migrations |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public Supabase key for client-style auth calls |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only.** Never exposed to clients. |
| `SUPABASE_JWT_SECRET` | HS256 secret to verify Supabase-issued JWTs |
| `SUPABASE_WEBHOOK_SECRET` | Shared secret for email-verified hook authentication |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | (Reserved) Redis for caching + queues |
| `THROTTLE_TTL_SECONDS` / `THROTTLE_LIMIT` | Global rate-limit window |

### Prisma 7 datasource
`prisma.config.ts` reads `DIRECT_URL` (preferred) or `DATABASE_URL` and passes it to the Prisma CLI. The runtime `PrismaClient` picks up `DATABASE_URL` directly via environment variable.

---

## 14. Build & Run

```bash
# Install
pnpm install

# Generate Prisma client
pnpm prisma generate

# Apply migrations (against DIRECT_URL)
pnpm prisma migrate dev --name <change>

# Dev
pnpm start:dev

# Production build
pnpm build && pnpm start:prod
```

API is served at `http://localhost:3000/api/v1`.

---

## 15. Testing Strategy (planned)

| Test type | Scope | Tooling |
|---|---|---|
| **Unit** | Domain entities, value objects, command/query handlers (mock ports & repositories) | Jest |
| **Integration** | Prisma repositories against test DB; `SupabaseJwtGuard` against mocked JWKS | Jest + dockerized Postgres |
| **E2E** | Full signup → verify → login → onboarding → role-assigned flow against a dedicated test Supabase project | Jest + Supertest |

Rules:
- Unit tests must not touch Prisma or Supabase SDK — handlers receive mocked ports.
- Integration tests run against a disposable Postgres database, not a shared dev DB.
- E2E tests run against a dedicated Supabase test project (its own URL + service-role key).

---

## 16. Scalability Path

Modular monolith first; ready for extraction.

- **Horizontal scaling**: stateless API workers behind a load balancer. JWT verification is stateless; only the `User` cache lookup needs Redis.
- **Read replicas**: Prisma's `previewFeatures = ["readReplicas"]` can be enabled when needed.
- **Queue workers**: BullMQ processors run as a separate Node process consuming Redis-backed queues. The application module exposes a `QueuePort`; queue producers enqueue work, processors call into application use cases.
- **Service extraction candidates** (in order of likelihood):
  1. **Notifications** (email, SMS, push) — already isolated as a planned port.
  2. **Search / indexing** — when product/job search outgrows Postgres FTS.
  3. **Analytics** — heavy aggregation, separate read store.
  4. **Payments** — regulatory isolation (PayMongo / Paynamics).
  5. **Document processing** — virus scan, OCR, metadata extraction.

Extraction process: a candidate module already depends only on ports + the CQRS bus. Replace the in-process `CommandBus.execute(cmd)` with a transport-aware bus (HTTP, gRPC, or message queue). No domain changes required.

---

## 17. Security Posture

- **Helmet** sets baseline security headers (CSP excluded by default — wire up per route group when frontend is ready).
- **CORS** is allowlist-based via `CORS_ORIGIN`.
- **Rate limiting** is global via Throttler with stricter per-route overrides on sensitive auth endpoints.
- **JWT verification** uses Supabase's HS256 secret. Tokens are validated for signature, `exp`, and `sub`. Algorithm is locked to `HS256` to prevent algorithm-confusion attacks.
- **Webhook signatures** are validated with `crypto.timingSafeEqual` to prevent timing side-channels.
- **Validation pipe** is global with `whitelist: true` and `forbidNonWhitelisted: true` — unknown fields are rejected, not silently dropped.
- **Sensitive log redaction** is enforced at the pino layer.
- **Service-role key** is server-only; never returned in any response.
- **Audit trail** records the actor, action, IP, user-agent, and trace ID for every privileged operation.

### Deferred (v2)
- MFA enrolment + verification.
- Field-level encryption at rest for PII (KEK-encrypted columns).
- Document virus scanning before storage download.
- JWT deny-list / revocation by `jti`.
- WAF + IP reputation (cloud-layer, not app concern).

---

## 18. Glossary

| Term | Meaning |
|---|---|
| **Command** | Intent to change state. Names start with a verb (`SignupCommand`, `AssignRoleCommand`). |
| **Query** | Intent to read state. Never mutates. |
| **Handler** | The implementer of a Command or Query. Lives in `application/`. |
| **Port** | Interface defined in `application/` that abstracts an external dependency (Supabase, Redis, mail). |
| **Adapter** | Concrete implementation of a Port. Lives in `infrastructure/`. |
| **Aggregate** | A cluster of domain objects treated as a single unit. `OnboardingState` is an aggregate. |
| **Value Object** | Immutable, defined by its values. `Email`, `Role` literal types. |
| **Event** | Past-tense fact published after a successful state transition (`UserSignedUpEvent`). |
| **ProblemDetails** | RFC 9457 error response format. |
| **Trace ID** | Per-request UUID used to correlate logs, audit rows, and error responses. |
