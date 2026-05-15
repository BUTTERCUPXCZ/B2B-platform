# STRUKTURA — Technical Document

> Core features, data models, APIs, jobs, and integrations.
> Companion to `STRUKTURA_context.md` (business) and `STRUKTURA_pages.md` (UI surface).
> Status: frontend ~80% UI scaffolded with mock data; backend = NestJS starter; full design below.

---

## 1. System Overview

**STRUKTURA** is a commission-based construction marketplace for the Philippines. Five domains share one platform: materials, services, bidding, contractor profiles, and paid cost estimation.

### Architecture

The system is a layered web + mobile platform fronted by a CDN and routed through a single backend API. Web traffic from the React 19 + Vite app and mobile traffic from the React Native iOS/Android apps both reach Cloudflare first, which terminates TLS and applies WAF + DDoS protection. Cloudflare forwards requests to the NestJS API, which is the only public entry point.

The API talks to three primary backing services: a Postgres database (managed by Supabase, accessed through Prisma) for transactional data; a Redis instance that drives both BullMQ background workers and short-lived caches; and Supabase Auth and Storage for user identity and private file hosting. The Redis-backed worker tier reaches out to external integrations on its own — PayMongo for Philippine-compliant payments, Resend for transactional email, Twilio for SMS, and ClamAV for malware scanning of uploaded documents — so the API request path stays fast and synchronous.

### Stack

| Layer | Tech | Status |
|---|---|---|
| Web (admin + buyer) | React 19, Vite 7, TanStack Router 1.168, TanStack Table 8, Tailwind 4, shadcn/ui, Motion, Recharts, Zod, Sonner | scaffolded, mock data |
| Mobile (primary) | React Native (iOS + Android) | not started |
| API | NestJS 11 (modular monolith), TypeScript 5.7, Node 20 | starter only |
| Worker | BullMQ on separate process | designed |
| DB | Postgres via Prisma + Supabase | designed |
| Auth | Supabase Auth (JWT, OAuth, MFA TOTP) | designed |
| Storage | Supabase Storage (private buckets, signed URLs) | designed |
| Cache/queue | Redis | designed |
| Payments | PayMongo OR Paynamics (PH-compliant) | not connected |
| Real-time | Supabase Realtime (chat, notifications) | designed |
| Search | Postgres FTS → Elasticsearch at scale | v1 = FTS |
| CDN | Cloudflare (TLS, WAF, DDoS) | designed |
| CI | GitHub Actions (lint + unit + e2e + Docker) | active for backend |

---

## 2. Domain Modules

### 2.1 Materials Marketplace

**Purpose:** Hardware sellers list SKUs; buyers cart + checkout via escrow.

**Data shape:** A seller owns many products, and each product can have many variants and many images. A buyer places many orders, and each order contains one or more line items pointing to the products they bought. An order has a single shipping address, a single payment transaction, and a single escrow ledger entry that records the held funds until delivery is confirmed. Products accumulate buyer reviews over time, but only after the order tied to that review has been delivered.

**Key rules:**
- Commission 5–15% per sale, deducted **atomically** at checkout (single DB tx)
- Bi-weekly payout cycle to seller (BullMQ scheduled job, every 2 weeks)
- Stock decremented on order confirmation, restored on cancellation
- Buyer reviews tied to a verified order (no review without delivery confirmation)

**Indexes:** `Product(sellerId, status)`, `Product(category, createdAt)`, `Order(buyerId, createdAt)`, `Order(sellerId, status, createdAt)`, FTS on `Product(name, description)`.

**Endpoints (planned):**
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/products` | public | Search/filter catalog |
| GET | `/products/:id` | public | Product detail |
| POST | `/seller/products` | seller | Create listing |
| PATCH | `/seller/products/:id` | seller | Update listing |
| POST | `/cart/items` | buyer | Add to cart |
| POST | `/orders` | buyer | Checkout (escrow hold) |
| GET | `/orders/:id` | owner+seller+admin | Order detail |
| POST | `/orders/:id/confirm-delivery` | buyer | Release escrow |
| POST | `/orders/:id/dispute` | buyer | Open dispute |

**Frontend routes:** `/shop`, `/shop/$productId`, `/cart`, `/checkout`, `/checkout/success`, `/dashboard/seller/{catalog,orders,reviews,payouts}`.

---

### 2.2 Service Company Listings

**Purpose:** Companies post services (architectural, electrical, plumbing, etc.); buyers book.

**Data shape:** A service company owns many services, and each service has its own gallery of photos and videos. The company also owns a set of verification documents (business permit, ID, etc.) reviewed by admin before the verified badge is granted. Buyers create bookings tied to a single service, and each booking carries its own message thread between buyer and company. Services collect reviews from buyers after a booking is fulfilled.

**Key rules:**
- Commission 8–12% per service
- Verified badge gated on admin doc review (business permit + ID)
- In-app messaging only (emails/phones masked until booking confirmed)

**Endpoints:**
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/services` | public | Filter by category/area |
| GET | `/services/:id` | public | Service detail |
| POST | `/company/services` | company | Create service |
| POST | `/services/:id/book` | buyer | Booking request |
| POST | `/bookings/:id/accept` | company | Accept booking |
| POST | `/bookings/:id/decline` | company | Decline booking |

**Frontend routes:** `/services`, `/services/post`, `/services/$serviceId`, `/dashboard/company/{services,bookings,payouts}`.

---

### 2.3 Contractor Bidding + Escrow (Module 3 — most complex)

**Purpose:** Clients post projects; contractors submit bids; awarded bids enter milestone-based escrow.

**Data shape:** A client posts many projects. Each project receives many bids, with each bid attached to exactly one contractor. A project breaks down into multiple milestones, and each milestone has a single milestone payment that records the escrow release tied to it. Once awarded, a project carries a single digitally signed contract, an ongoing message thread between client and contractor, a stream of progress photos uploaded as the work proceeds, and a series of escrow ledger entries that record every hold, partial release, refund, or compensation deduction. A project may also have at most one open dispute, which itself collects evidence items — photos, messages, timeline snapshots — submitted by either party.

**Project lifecycle (8 stages):**
| Stage | Trigger | DB state |
|---|---|---|
| 1. Posted | Client publishes | `Project.status = OPEN_FOR_BIDS` |
| 2. Bidding | Within bid window | bids accumulate |
| 3. Awarded | Client picks bid | `Project.awardedBidId` set, `status = AWARDED` |
| 4. Signed | Both digitally sign contract | `Contract.signedAt`, `status = ACTIVE` |
| 5. Active | Work in progress | per-milestone updates |
| 6. Milestone Reviews | Contractor marks done → client approves | per-milestone escrow release |
| 7. Completion | Last milestone approved | final escrow release, `status = COMPLETED` |
| 8. Archive | Client submits rating | `status = ARCHIVED` |

**Escrow ledger** tracks every state transition: `HOLD`, `RELEASE_PARTIAL`, `RELEASE_FINAL`, `REFUND`, `DELAY_COMPENSATION_DEDUCTION`. Sum of ledger entries always equals available balance — auditable.

**Grace period + delay compensation:**
- Each project signs a 1–2 mo grace period
- Alert system: yellow at -14d, orange during grace, red on expiry
- Daily BullMQ scheduled job (`projects.delay-compensation`) computes delay days × pre-agreed daily rate, deducts from escrow on next payout

**Endpoints:**
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/projects` | client | Post project |
| GET | `/projects/:id` | parties+admin | Project detail |
| POST | `/projects/:id/bids` | contractor | Submit bid |
| POST | `/projects/:id/award` | client | Award bid + create contract |
| POST | `/contracts/:id/sign` | party | Digital signature |
| POST | `/projects/:id/milestones/:mid/complete` | contractor | Mark done |
| POST | `/projects/:id/milestones/:mid/approve` | client | Approve + release escrow |
| POST | `/projects/:id/disputes` | party | Open dispute |
| POST | `/admin/disputes/:id/rule` | admin | Binding ruling |

**Frontend routes:** `/jobs`, `/jobs/post`, `/jobs/$jobId`, `/jobs/$jobId/bid`, `/projects/$projectId`, `/dashboard/{client,contractor}/{jobs,bids,projects,earnings}`, `/dashboard/admin/disputes`.

---

### 2.4 Contractor Profiles + Verification

**Purpose:** Build trust via 5-tier verified-badge ladder.

**Verification tiers:**
| Tier | Requirements | Granted by |
|---|---|---|
| 1. Unverified | account registration only | auto |
| 2. Identity Verified | govt ID approved | admin doc review |
| 3. License Verified | trade license validated | admin doc review |
| 4. Portfolio Verified | ≥3 portfolio projects approved | admin review |
| 5. Top Rated | 4.5+ stars, 10+ completed projects, License Verified | nightly batch job |

**Featured Contractor slot:** monthly fee OR auto-awarded to Top Rated (rotating).

**Rating algorithm:** weighted rolling average. Recent reviews weighted higher with exponential decay (e.g., `weight = exp(-age_days / 180)`). Recomputed nightly per contractor.

**Data shape:** Each contractor has a single profile record holding bio, trade, location, years of experience, and starting price. The contractor owns a portfolio composed of many portfolio projects, each with its own gallery of images and captions. The contractor also accumulates certifications (each with issuer + year) and maintains a single availability calendar that holds an arbitrary number of time slots marked available, booked, or tentative. Reviews aren't attached directly to the contractor — they flow in through completed projects, then aggregate into the contractor's rating. A denormalized verification level field on the profile mirrors the current tier for fast read queries.

**Endpoints:**
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/contractors` | public | List/filter |
| GET | `/contractors/:id` | public | Profile detail |
| PATCH | `/contractor/profile` | contractor | Edit profile |
| POST | `/contractor/portfolio` | contractor | Add project |
| POST | `/contractor/availability` | contractor | Set slots |
| POST | `/admin/verifications/:id/approve` | admin | Promote tier |
| POST | `/admin/verifications/:id/reject` | admin | Reject with notes |

**Frontend routes:** `/contractors`, `/contractors/$contractorId`, `/dashboard/contractor/{bids,projects,earnings}`, `/dashboard/admin/verifications`.

---

### 2.5 Fair Cost Estimation (paid premium)

**Purpose:** Pay-up-front estimation; human estimator delivers detailed PDF in 2–5 business days.

**Flow:**
1. Multi-step intake form → project type, scope, materials, location
2. Payment (₱500–2,000)
3. Estimator auto-assigned (round-robin or specialty match)
4. Estimator drafts itemized report
5. PDF generated + emailed; downloadable from dashboard

**Report contents:**
- Itemized materials list (qty, unit price, subtotal)
- Labor breakdown by trade
- 10–15% contingency buffer
- Regional price adjustment factor
- 30-day validity note

**Data shape:** A client submits many estimate requests. Each request is paired with one payment transaction (the upfront fee) and, once delivered, with one estimate report. The report itself breaks down into many line items — each row of the itemized materials and labor breakdown. Every estimate request is assigned to exactly one estimator (an admin-role user with the estimator permission).

**Endpoints:**
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/estimates/intake` | buyer | Submit form + pay |
| GET | `/estimates/:id` | owner+admin | Status |
| GET | `/estimates/:id/report.pdf` | owner+admin | Download PDF |
| POST | `/admin/estimates/:id/assign` | admin | Assign estimator |
| POST | `/admin/estimates/:id/deliver` | estimator | Submit report |

**Frontend routes:** `/estimate`, `/estimate/report/$estimateId`, `/estimate/success`, `/dashboard/client/estimates`.

---

### 2.6 Jobs / Job Board — Public Discovery Surface

The Jobs page is the **public-facing discovery layer** that feeds the bidding flow described in §2.3. Module 3 covers what happens *after* a contractor decides to bid — escrow, milestones, dispute resolution. This section covers what happens *before*: how contractors find the right job to bid on, and how buyers post jobs that surface to the right contractors.

#### Purpose

A continuously updated, public-readable list of every active project posted by clients. It is the contractor-side entry point to the platform's two-sided marketplace flywheel: more buyers post, more contractors bid, more contracts close, more buyers return.

#### Audience-aware UX

The same URL serves three audiences, with the page adapting per role:

| Audience | What they see | Primary action |
|---|---|---|
| Anonymous visitor | Full board, can browse + filter, cannot bid | Sign up / log in to bid |
| Logged-in client (buyer) | Full board with a prominent "Post a job instead" CTA — buyers are likely to need to post more, not bid | Post a job |
| Logged-in contractor | Full board with personalized relevance — their trade + service area surface first; bid count and budget visible up front so they can self-qualify before opening the detail page | View & bid |

#### Filtering + sorting

- **Trade chips** reuse the same 8-category taxonomy used across Services and Contractors (Custom Home Build, Renovation, Roofing, Plumbing, Electrical, Painting, Landscaping, Repairs & Handyman). One source of truth across the platform — adding a new trade adds it everywhere.
- **Free-text search** across job title, scope description, location, and trade name.
- **Sort options:**
  - Most recent (default)
  - Highest budget
  - Soonest deadline
  - Fewest bids — useful for contractors who want to find low-competition opportunities before they saturate
- **Location filter** scoped to city or region. Future enhancement: distance-from-me when geolocation is enabled.

#### Anatomy of a job card

Each card is designed for fast scanning — a contractor should be able to triage 30+ jobs per minute and only open detail pages for ones worth bidding. Every element is intentional:

| Element | Purpose |
|---|---|
| Trade tag | Color-coded by category for instant visual filtering |
| Location | City — contractors filter their service radius mentally |
| Time since posted | Human-readable decay (2h ago, 5h ago, 3d ago); recency matters because cold jobs often mean the buyer already chose someone |
| Title | One-line job summary the buyer wrote |
| Scope blurb | 1–2 lines of detail so a contractor can self-qualify without clicking |
| Budget pill | Always a range, never an exact figure — leaves room for bids and discourages anchor pricing |
| Urgency pill | ASAP / within a week / within a month / flexible — contractors prioritize by their own pipeline |
| Bid count | Social proof for buyers; also lets contractors avoid already-saturated jobs |
| Posted by | Buyer name + "Verified buyer" badge if KYC complete |
| Primary CTA | "View & bid" → opens job detail page, which leads into the §2.3 bidding flow |

#### Free-to-post economics

Posting a job costs nothing. The platform earns commission only on **awarded contracts** (per §2.3), not on listings. This is deliberate:

- Free posting drives buyer supply
- Buyer supply drives contractor engagement
- Contractor engagement drives bids and award rate
- Award rate drives platform revenue
- Healthy revenue funds reinvestment into the buyer experience, which drives more buyer supply

Anti-spam guardrails prevent abuse without throttling legitimate buyers: unverified accounts can post 3 jobs per 24 hours; verified buyers get a higher cap. Repeated low-quality or fraudulent posts trigger admin review and account flagging.

#### "Verified buyer" badge

The buyer-side mirror of the 5-tier contractor ladder. Granted when:

1. Buyer completes KYC (government ID approved by admin, per §3.3)
2. Buyer has funded at least one escrow contract through the platform

Effects:

- Verified-buyer jobs rank higher in default sort
- Verified buyers unlock priority dispute support (response within 1 business day instead of 3)
- Contractors can filter the board to **verified-buyer jobs only** — meaningful protection against ghost posters who never intend to hire

#### Performance and freshness

The Jobs board is the hottest surface on the platform — contractors refresh it constantly throughout the day. The cache strategy reflects that:

- **Anonymous views** are cached at the edge (Cloudflare) with a short TTL (30 seconds) so new posts surface quickly without overwhelming origin
- **Authenticated views** (with personalized filters by trade/location) bypass the edge cache and hit the API directly, with cursor pagination on `(postedAt DESC, id)` for stable scroll
- **"Time since posted"** is computed client-side from a server-supplied ISO timestamp — this avoids busting cache every minute as relative-time strings change

Expected p95 latency: under 200 ms for the first page of results, under 500 ms for filtered queries against 100,000 active jobs.

#### Lifecycle visibility

A job has a public lifetime that is shorter than its full lifecycle. Once a job transitions out of "open for bids" (awarded, signed, in-progress, completed, archived), it leaves the public board entirely. From that point on it appears only in:

- The buyer's dashboard (under their projects)
- The awarded contractor's dashboard (under their active projects)
- The platform admin's view (for moderation and dispute purposes)

Once a project completes and both parties opt in, it can return as social proof on the awarded contractor's profile portfolio (§2.4).

#### Frontend routes and entry points

- **Public route:** `/jobs` — the board itself
- **Detail route:** `/jobs/{jobId}` — full project description, milestones the buyer expects, attachments
- **Bid form:** `/jobs/{jobId}/bid` — bid amount, itemized breakdown, milestone proposal, cover message
- Reachable from: main navigation ("Jobs" tab), homepage hero CTA, contractor dashboard, contractor email digests
- Mobile parity is required — same filter chips, same card layout, thumb-scroll friendly. Most contractors browse jobs on their phones between job sites.

#### Why this is a separate section from §2.3

§2.3 documents the **bidding mechanic** — project lifecycle state machine, escrow ledger, milestone payments, dispute resolution. §2.6 documents the **discovery layer** that feeds bids into that pipeline.

Treating them as distinct sections mirrors how engineering will build them:

- §2.3 is backend-heavy: state transitions, escrow integrity, milestone arithmetic, dispute flow
- §2.6 is frontend-heavy: filter UX, card design, edge caching, search relevance
- Different teams may own them; different SLOs apply (the board prioritizes freshness; the bidding flow prioritizes correctness)

---

## 3. Cross-Cutting Concerns

### 3.1 Roles + Permissions

| Role | Browse | Buy | Sell Materials | Post Service | Bid | Receive Payouts | Admin Override |
|---|---|---|---|---|---|---|---|
| Guest | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Client / Homeowner | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Hardware Seller | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Contractor | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Service Company | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Platform Admin | ✅ | — | — | — | — | — | ✅ |

Single user can hold multiple roles via `UserRoleAssignment` join table.

### 3.2 Auth (Supabase)

- Frontend → `supabase-js` client → Supabase Auth → JWT (HS256, 1h access + 7d refresh)
- API verifies JWT in `SupabaseJwtGuard`, hydrates `req.user` with roles + MFA status
- Sensitive ops (escrow release, contract sign, doc download) require MFA re-auth within 15 min
- Inactivity logout: 30 min for admin/verifier
- Rate limits: 5 login fails per IP per 15 min

### 3.3 Documents (KYC, contracts, portfolio)

- Upload: API issues signed Supabase Storage URL (5 min TTL); client uploads direct
- Finalize: API HEADs object, transitions doc to `SCANNING`, enqueues `documents.scan` job
- Scan: ClamAV sidecar + magic-byte validation + image re-encode (strips EXIF/scripts)
- Download: RBAC check + audit log + signed URL (5 min)
- Encryption: at rest (Supabase AES-256) + field-level for PII (`UserIdentity.idNumberCt`, KEK from cloud vault)
- Retention: 7 years for audit; per-doc-type for KYC; nightly purge job

### 3.4 Notifications

- Producer: any service calls `notifications.queue.add(event, payload)`
- Worker: `notifications.email` (Resend/SES), `notifications.sms` (Twilio), `notifications.in-app` (Supabase Realtime + DB write)
- Per-user channel prefs in `UserNotificationPreference`
- Retry: exponential backoff, 5 attempts, DLQ on exhaust

### 3.5 Audit Log

- Hash-chained: `row.hash = sha256(row.prev_hash || canonicalize(row))`
- All write routes auto-logged via `AuditInterceptor`
- Forwarded to SIEM via `audit.fanout` worker
- 7-year retention; tamper-evident

### 3.6 Background Jobs (BullMQ)

| Queue | Trigger | Concurrency | Backoff | Purpose |
|---|---|---|---|---|
| `documents.scan` | post-upload | 4 | exp 5s, 5 tries | ClamAV + magic bytes + re-encode |
| `documents.retention` | daily 03:00 UTC | 1 | linear | Hard-delete past retention |
| `notifications.email` | event publish | 16 | exp 2s, 5 tries | Resend/SES |
| `notifications.sms` | event publish | 8 | exp 2s, 5 tries | Twilio |
| `audit.fanout` | every audit insert | 8 | exp 1s, 10 tries | SIEM forwarding |
| `payouts.bi-weekly` | cron Mon 0:00 UTC every 2w | 1 | linear | Compute + initiate seller payouts |
| `projects.delay-compensation` | daily 04:00 UTC | 1 | linear | Compute delays, deduct from escrow |
| `contractors.recompute-ratings` | daily 05:00 UTC | 1 | linear | Weighted rolling average |
| `contractors.top-rated-promotion` | nightly | 1 | linear | Auto-promote to Top Rated tier |
| `estimates.assign-estimator` | on payment success | 4 | exp | Round-robin estimator assignment |

All jobs idempotent (resource id + state key). DLQ → ops digest + Prometheus alert.

### 3.7 Payments

- Provider: PayMongo or Paynamics (PH-compliant; e-wallet, bank, card)
- Webhook handler validates HMAC signature, updates `PaymentTransaction.status`
- Escrow flow: `payment.success` → ledger `HOLD` → milestone approval → ledger `RELEASE`
- All payment ops idempotent on `payment_intent_id`
- Refunds via provider API + ledger `REFUND` entry

---

## 4. Data Model — Authoritative ER (planned)

The platform's data model is organized into three layers: identity + access (the user, their roles, their encrypted PII, and their notification preferences); compliance (documents, document access logs, and the hash-chained audit log); and the five domain modules (marketplace, services, bidding, contractor profiles, estimation, escrow ledger).

### Identity layer

The **user** record mirrors the Supabase auth user by sharing the same UUID as primary key. It stores the email (unique), full name, phone in E.164 format, account status (active, suspended, or deleted), an MFA-enabled flag, and the standard created/updated/deleted timestamps. Roles attach via a separate **user role assignment** join table — a user can hold multiple roles (admin, client, seller, contractor, company, estimator), and each row records when the role was granted. Sensitive personally identifiable information lives in a separate **user identity** record: ID numbers are stored as ciphertext, accompanied by an HMAC hash for lookup and a key reference indicating which key encryption key is in force. Each user also has a **notification preference** record toggling email, SMS, push, and in-app channels independently.

### Compliance layer

The **document** record represents any uploaded file — government IDs, licenses, permits, portfolio submissions, contracts. It tracks the file's kind, its current lifecycle status (pending upload, scanning, ready, infected, rejected, or deleted), where it lives in object storage, its mime type, byte length, and SHA-256, plus the scan result, retention deadline, upload timestamp, and soft-delete timestamp. Every read of a document writes a row to the **document access** log: which actor performed the action (viewed, downloaded, or denied), from what IP and user agent, against which signed URL ID, and when. The platform-wide **audit log** sits above all of this — every state-changing action by any actor against any resource is logged with the actor, target user, target resource type, target resource ID, event type, network metadata, request ID, and a free-form JSON metadata payload. Each audit row carries the SHA-256 hash of the previous row chained into its own hash, making the log tamper-evident.

### Domain layer

**Marketplace** holds product catalog and orders: products, product variants, product images, orders, order line items, shipping addresses, payment transactions, and reviews. **Services** holds the supply side of the booking flow: companies, services they offer, service media, bookings, and per-booking message threads. **Bidding** holds the most operationally complex graph: projects, bids, milestones, milestone payments, contracts, project messages, progress photos, disputes, and dispute evidence. **Contractor** holds the trust layer: contractor profile, portfolio projects, portfolio images, certifications, availability calendars and slots, and a denormalized verification level. **Estimation** holds the paid-service flow: estimate requests, estimate reports, and the line items inside each report.

### Escrow ledger

The **escrow ledger** is the one shared backbone across orders and projects. Every entry records which order or project it belongs to, the entry type (hold, partial release, final release, refund, or delay-compensation deduction), the amount, the balance after the entry, the payment transaction it references, and when it occurred. The sum of entries always equals the available escrow balance, which makes the ledger trivially auditable and reconcilable.

### Cross-cutting guarantees

Postgres row-level security policies enforce ownership at the database level — even a misconfigured API route cannot leak rows belonging to other users. Performance-critical tables carry composite indexes on the owner column plus the created-at timestamp, so cursor-based pagination always walks an index instead of scanning the table.

---

## 5. Frontend Surface

51 routes / 9 sections. See `STRUKTURA_pages.md` for full inventory.

**Routing:** TanStack Router v1, file-based, auto code-split.

**State:** React Context — `RoleProvider`, `CartProvider`, `ThemeProvider` — backed by localStorage (keys: `struktura:cart:v1`, `struktura:role:v1`).

**Critical pages:**
- `/` — landing (hero, about, what-we-do, process, featured, testimonials, sell-on-struktura, footer)
- `/shop`, `/shop/$productId`, `/cart`, `/checkout`
- `/jobs`, `/jobs/post`, `/jobs/$jobId`, `/jobs/$jobId/bid`
- `/services`, `/services/post`, `/services/$serviceId`
- `/contractors`, `/contractors/$contractorId`
- `/projects/$projectId`
- `/estimate`, `/estimate/report/$estimateId`
- `/messages`
- `/dashboard/{client,seller,contractor,company,admin}` + sub-pages

**Design tokens** (`src/index.css`): brand-orange `#ff7420`, brand-ink `#0f100f`, brand-surface `#f5f3ef`. Fonts: Poppins (heading), Inter (body).

---

## 6. Security Posture

| Threat | Defense |
|---|---|
| SQL injection | Prisma parametrized queries only |
| Unauthorized doc access | RLS + DocumentAccessGuard + per-row check |
| Malware upload | ClamAV + magic bytes + re-encode |
| Plaintext PII | Field-level encryption (KEK from vault) |
| Brute-force login | Redis rate limit (5/15min/IP) |
| Session hijacking | httpOnly + secure cookies, 1h JWT, MFA re-auth |
| Audit tampering | Hash-chained log + offsite SIEM forwarding |
| Leaked service-role key | OIDC federation, no long-lived secrets in repo |
| Escrow lossiness | Atomic ledger writes inside DB tx |
| Payment double-charge | Idempotency on `payment_intent_id` |
| Scope-creep on disputes | Binding admin ruling within 3 business days SLO |

---

## 7. Performance + Scaling

- Cursor-based pagination on `(owner, created_at)` — no `OFFSET`
- Cache user role + profile in Redis (5 min TTL, invalidated on update)
- FTS via Postgres `tsvector` + GIN index for v1; migrate to Elasticsearch if QPS > 200/s
- Bulk image upload via signed URLs direct to Storage — API never proxies bytes
- N+1 prevention: Prisma `include` patterns reviewed in code review
- Read replicas for reporting/analytics queries (separate connection pool)

---

## 8. Observability

- **Logs:** structured JSON via pino → Loki/Datadog
- **Metrics:** Prometheus (`@willsoto/nestjs-prometheus`) → Grafana
- **Traces:** OpenTelemetry → Tempo/Honeycomb
- **Alerts:** 5xx >1%/5min, login fail spike, DLQ depth >0/15min, doc scan p95 >30s, audit insert failure (page on)

---

## 9. Development Phases

| Phase | Scope | Duration |
|---|---|---|
| 1 | Foundation + auth + users + docs | 4 weeks |
| 2 | Materials Marketplace | 6 weeks |
| 3 | Contractor System + Bidding + Escrow | 8 weeks |
| 4 | Progress Tracking + Services | 8 weeks |
| 5 | Estimation + Premium | 6 weeks |
| 6 | QA + Hardening + Launch | 8 weeks |

**Total:** 10 mo minimum; 12–14 mo realistic. Team: 1 PM, 2 BE, 2 FE/Mobile, 1 UI/UX, 1 QA.

---

## 10. Out of Scope (v1)

- AI chatbot / scope generator
- AR/VR room visualization
- Logistics/delivery partner integration
- Insurance/warranty marketplace
- B2B bulk procurement
- Multi-language beyond English + Filipino
- Crypto / digital wallet payments
- Microservices extraction (monolith first)

---

## 11. References

- `STRUKTURA_context.md` — business model, modules, phases, risks
- `STRUKTURA_pages.md` — UI surface, all 51 routes
- `docs/ARCHITECTURE.md` — backend system architecture (deep dive)
- `frontend/src/routes/__root.tsx` — provider chain, error boundary
- `frontend/src/components/cart/cart-context.tsx` — cart state + storage key
- `frontend/src/components/dashboard/role-context.tsx` — role state + storage key
- `backend/prisma/schema.prisma` — DB schema (planned)
