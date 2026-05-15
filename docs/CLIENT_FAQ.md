  # STRUKTURA — Client Q&A + Scaling Plan

  > Answers to client questions on features, timeline, tech, reliability, and scale.
  > May 2026 · Companion to `docs/TECHNICAL.md` for deeper technical detail.

  ---

  ## A. App Features & Functionality

  ### A1. What core features will the app have? How will it work for different users?

  STRUKTURA has **five core modules** on one platform. Each user role sees only what's relevant to them.

  #### The five core modules

  | # | Module | What it does |
  |---|---|---|
  | 1 | **Materials Marketplace** | Hardware sellers list construction materials (cement, steel, lumber, tiles, paint, fixtures). Buyers search, add to cart, check out via escrow. |
  | 2 | **Service Listings** | Companies post services (architectural, electrical, plumbing, etc.) with pricing, coverage area, portfolio. Buyers book directly. |
  | 3 | **Contractor Bidding + Escrow** | Clients post projects with budget + timeline. Contractors bid with itemized breakdowns + milestones. Funds held in escrow, released per milestone approval. |
  | 4 | **Verified Contractor Profiles** | 5-tier verification ladder (Unverified → Identity → License → Portfolio → Top Rated). Featured slots boost visibility. Weighted star ratings. |
  | 5 | **Fair Cost Estimation** | Paid premium service (₱500–2,000 upfront). Estimator delivers PDF report in 2–5 business days with itemized materials, labor, contingency, regional adjustment. |

  #### How each user type works

  **Homeowner / Client (buyer)**
  - Browse + buy construction materials
  - Post projects, review bids, hire contractors
  - Pay through escrow — funds release only on milestone approval
  - Request paid cost estimates
  - Message sellers + contractors in-app
  - Dashboard: orders, projects, bids received, estimates

  **Hardware Seller (supplier)**
  - List products with photos, pricing, stock, variants
  - Manage incoming orders (confirm → ship → complete)
  - Reply to reviews
  - Receive bi-weekly payouts (commission auto-deducted)
  - Dashboard: catalog, orders, reviews, payouts

  **Contractor (individual professional)**
  - Build verified profile with portfolio + certifications
  - Bid on posted projects
  - Update milestones with progress photos
  - Get paid per milestone via escrow
  - Maintain availability calendar
  - Dashboard: bids, active projects, earnings

  **Service Company**
  - Post services with pricing + coverage area
  - Manage booking requests
  - Upload portfolio (subject to admin verification)
  - Receive payouts per booking
  - Dashboard: services, bookings, payouts

  **Platform Admin**
  - Review KYC documents (govt ID, business permits, licenses)
  - Approve / reject contractor verifications
  - Mediate disputes within 3 business days
  - View platform-wide reports (revenue, GMV, user growth)
  - Override transactions when needed
  - Dashboard: disputes, verifications, reports, analytics

  ---

  ### A2. What unique features make STRUKTURA different from other construction/hardware platforms?

  | # | Feature | Why it's different |
  |---|---|---|
  | 1 | **All five sides on one platform** | Most apps cover only materials OR services OR project bidding. STRUKTURA covers materials + services + bidding + verification + estimation in one workflow. |
  | 2 | **Milestone-based escrow** | Other PH construction platforms either don't hold funds or pay on completion only. We release **per milestone**, protecting both client and contractor. |
  | 3 | **5-tier verified-badge ladder** | Most platforms have 1 verified flag. We require Identity → License → Portfolio → Top Rated, each granted only after admin doc review. Buyers can filter by tier. |
  | 4 | **Auto delay-compensation** | If a contractor blows past the agreed grace period, the system **auto-deducts** a pre-agreed daily rate from escrow. No haggling. No app I've seen does this in PH. |
  | 5 | **Fair Cost Estimation as paid premium** | Buyers can pay for a human-verified estimate before posting a project — fights cost overruns at the source. Other apps let you fly blind. |
  | 6 | **PH-first** | Local payment methods (PayMongo / Paynamics — GCash, Maya, BPI, BDO), Filipino + English, regional price adjustments built into estimates, BSP-compliant escrow design. |
  | 7 | **Dispute officer with binding ruling** | Most marketplaces just freeze payments and tell parties to sort it out. STRUKTURA has a dedicated dispute team with binding 3-day SLO. |
  | 8 | **Atomic commission** | Commission deducted in same DB transaction as the sale — never partial, never lossy. Sellers always know their payout exactly. |
  | 9 | **Weighted rolling rating** | Recent reviews count more. A contractor who improved last quarter shouldn't be dragged down by a 3-year-old complaint. |
  | 10 | **Real-time messaging + audit trail** | Every booking conversation is preserved + searchable. If a dispute opens, the dispute officer reads the actual chat transcript. |

  ---

  ### A3. Jobs / Job Board — How buyers and contractors find each other

  The Job Board is the public-facing page where everything starts. Buyers post a project, the listing appears on the board within seconds, and contractors across the country can browse, filter, and bid — all in one place.

  #### What the page does

  A continuously updated feed of every active project posted by clients. Buyers reach it by clicking "Post a job" from the homepage hero or main navigation. Contractors reach it from their dashboard or from email digests we send them when a job matching their trade goes live.

  #### Three audiences, one page

  The same URL adapts to the visitor:

  | Visitor | What they see | What they can do |
  |---|---|---|
  | Anonymous (not logged in) | Full board — they can browse and filter to gauge whether the platform is worth signing up for | Sign up or log in to bid |
  | Logged-in buyer | Same board with a prominent "Post a job instead" call-to-action — buyers usually need to post more, not bid | Post a new job |
  | Logged-in contractor | Personalized board where their trade and service area surface first, with bid count and budget visible up front | View and bid |

  #### What's on each job card

  Each posting is summarized as a card built for fast scanning. A contractor on a phone between job sites should be able to look at 30 cards in a minute and only tap into the ones worth bidding on.

  | Element | Why it's there |
  |---|---|
  | Trade tag | Color-coded by category (Roofing, Plumbing, etc.) — instant visual sorting |
  | Location | City — contractors filter their service radius mentally |
  | Time since posted | "2h ago", "3d ago" — recency matters; cold jobs often mean the buyer already chose someone |
  | Title | One-line summary the buyer wrote |
  | Scope blurb | One or two sentences of detail so contractors can self-qualify without clicking through |
  | Budget pill | Always a range, never an exact number — leaves room for bids |
  | Urgency pill | ASAP, within a week, within a month, or flexible — contractors prioritize by their own pipeline |
  | Bid count | How many contractors have already bid; lets contractors see if a job is saturated |
  | Posted by | Buyer name, plus "Verified buyer" badge if they've completed KYC |
  | Primary action | "View & bid" button that opens the full project detail page |

  #### Filtering and sorting

  Contractors can narrow the board by trade chip (the same eight categories used everywhere — Custom Home Build, Renovation, Roofing, Plumbing, Electrical, Painting, Landscaping, Repairs & Handyman), search free-text across title and description, and sort by most recent (default), highest budget, soonest deadline, or fewest bids (for contractors hunting low-competition opportunities).

  #### Free for buyers

  Posting a job is **always free**. The platform earns commission only when a project is awarded and the contract is signed. This is deliberate: free posting drives buyer supply, buyer supply drives contractor engagement, and contractor engagement drives more contracts. Anti-spam guardrails (3 jobs per 24 hours for unverified accounts, higher for verified) prevent abuse without throttling legitimate buyers.

  #### "Verified buyer" badge

  The buyer-side mirror of the contractor verification ladder. A buyer earns the badge after passing KYC (government ID review) and funding at least one escrow contract through the platform. Verified-buyer jobs:

  - Rank higher in the default sort
  - Unlock priority dispute support (response within 1 business day instead of 3)
  - Can be filtered by contractors who only want to bid on serious posters — meaningful protection against ghost buyers

  #### What happens after a job is awarded

  Once a buyer picks a contractor, that job leaves the public board and moves into the dashboards of the involved parties. From that point on it's tracked through the bidding-and-escrow flow described in feature 3 above (milestones, progress photos, escrow releases, dispute resolution if needed). Once the project finishes — and only if both parties opt in — it can return as social proof on the contractor's portfolio.

  #### Why it matters

  The Job Board is the heartbeat of the contractor side of the platform. A buyer-friendly post flow plus a contractor-friendly browse flow is what turns idle contractors into active bidders, which is what turns posted jobs into signed contracts, which is what generates platform revenue. We treat it as the most important surface to keep fast, fresh, and trustworthy.


  ---

  ## B. Development Process & Timeline

  ### B1. How long will it take to fully develop and launch? Key steps?

  **10 months minimum, 12–14 months realistic** (with contingency for revisions, payment provider approval, and pilot feedback).

  **Team assumed:** 1 PM, 2 backend devs, 2 frontend/mobile devs, 1 UI/UX designer, 1 QA engineer.

  #### Six development phases

  | Phase | Scope | Duration | Cumulative |
  |---|---|---|---|
  | **1. Foundation** | Architecture, auth, user accounts, document uploads, KYC flow, admin shell | 4 weeks | Month 1 |
  | **2. Materials Marketplace** | Product catalog, cart, checkout, escrow v1, seller dashboard, payouts | 6 weeks | Month 2.5 |
  | **3. Contractor System + Bidding** | Profiles, verification ladder, project posting, bid flow, milestone escrow | 8 weeks | Month 4.5 |
  | **4. Progress Tracking + Services** | Milestone updates, dispute flow, service company listings + bookings | 8 weeks | Month 6.5 |
  | **5. Estimation + Premium** | Paid estimate intake + estimator workflow + PDF generation, featured contractor slots | 6 weeks | Month 8 |
  | **6. QA + Hardening + Launch** | Penetration testing, load testing, beta with pilot users, bug fixing, app store submission | 8 weeks | Month 10 |

  #### Key milestones along the way

  - **Week 4** — internal demo of auth + admin
  - **Week 10** — pilot sellers can list + sell materials
  - **Week 18** — pilot contractors can bid + escrow
  - **Week 26** — full feature set demoable
  - **Week 32** — closed beta with 50–100 pilot users
  - **Week 40** — public launch

  ---

  ### B2. How do you handle changes or adjustments after development starts?

  We use **agile sprints** (2-week cycles). At end of each sprint, we demo working features and you give feedback. Changes fall into three buckets:

  | Type | How handled | Example |
  |---|---|---|
  | **Within current sprint** | Small UX tweaks, copy changes, color adjustments — done same sprint, no formal change request | "Make the bid button orange instead of blue" |
  | **Backlog re-prioritization** | New feature ideas — added to backlog, scheduled for upcoming sprint after review | "Can we add a wishlist on shop?" |
  | **Scope change request** | Big additions or pivots — written change request with timeline + cost impact, signed before work starts | "Add a delivery booking module" |

  **Guardrails:**
  - Original scope locked in writing before kickoff
  - Change-request budget reserved (typically 10–15% of total) so small changes don't trigger paperwork
  - Client demo every 2 weeks; written go/no-go on each sprint
  - Hard freeze on changes 4 weeks before launch — only critical bugs accepted

  This keeps the project moving without losing flexibility.

  ---

  ### B3. What technology will you use? Is it stable and easy to maintain?

  #### The stack

  | Layer | Tech | Why |
  |---|---|---|
  | **Mobile (primary)** | React Native | Single codebase for iOS + Android. Mature, used by Facebook, Shopify, Discord. |
  | **Web (admin + buyer)** | React 19 + Vite + TanStack Router | Industry standard. Fast builds. Type-safe routing. |
  | **Backend API** | NestJS 11 (TypeScript) | Modular, opinionated structure, excellent for teams. Used by Adidas, Decathlon, Capgemini. |
  | **Database** | PostgreSQL (via Supabase) | Most reliable open-source DB. Battle-tested at scale. |
  | **ORM** | Prisma | Type-safe queries. Catches bugs at build time, not in production. |
  | **Auth** | Supabase Auth | Built-in MFA, OAuth (Google/Apple), industry-grade JWT. We don't roll our own (security risk). |
  | **File storage** | Supabase Storage | Direct upload signed URLs. Cheaper than S3. |
  | **Background jobs** | BullMQ (Redis) | Reliable retries, scheduled jobs, dead-letter queues. |
  | **Payments** | PayMongo or Paynamics | PH-compliant. Supports GCash, Maya, BPI, BDO, cards. |
  | **Real-time** | Supabase Realtime | Chat + notifications without WebSocket plumbing. |
  | **Hosting** | Railway or AWS | Auto-scaling, managed, predictable cost. |
  | **CDN** | Cloudflare | TLS, WAF, DDoS protection — all included. |

  #### Why this stack is stable + maintainable

  - **All choices are mainstream** — easy to hire developers, lots of documentation, active communities
  - **TypeScript everywhere** — bugs caught before deploy, easier refactoring
  - **Modular monolith** — one codebase to start, can split into microservices later if needed (not now — premature optimization)
  - **Managed services** for DB, auth, storage, queues — Supabase + Cloudflare handle uptime + backups + scaling
  - **Open standards** — JWT, REST, SQL, Postgres — no proprietary lock-in
  - **Comprehensive tests** — unit + integration + end-to-end before every deploy
  - **CI/CD automated** — every code change runs lint + tests + security scan before merge

  ---

  ### B4. How do you ensure the app runs smoothly, doesn't crash, and is secure?

  #### Smooth + crash-free

  | Practice | Effect |
  |---|---|
  | **Automated tests** before every deploy (unit + integration + end-to-end) | Catch bugs in CI, not production |
  | **Staged rollout** — staging → 10% prod → 100% prod | Bad releases hit only 10% of users; we roll back in minutes |
  | **Database transactions** for money-touching operations | Either everything succeeds or nothing — no half-done escrow |
  | **Idempotency keys** on payment + booking endpoints | Retrying a request never charges twice |
  | **Connection pooling** + **read replicas** | DB never overloaded |
  | **Redis caching** for user roles, profiles, hot product pages | Pages load fast even at peak traffic |
  | **Image optimization** + CDN | Photos served from edge, not origin |
  | **Error monitoring (Sentry)** | We see crashes before users report them |
  | **Health checks** every 30s on every server | Auto-restart unhealthy containers |
  | **Rate limiting** | Bad actors can't hammer the app and slow it down |

  #### Secure

  | Threat | Defense |
  |---|---|
  | Stolen passwords | MFA (TOTP), Argon2id hashing, lockout after 5 fails |
  | Session hijacking | Short-lived JWT (1h), httpOnly cookies, refresh rotation |
  | Database breach | Field-level encryption for PII (govt IDs encrypted with vault keys) |
  | SQL injection | Prisma parametrized queries — only safe queries possible |
  | Malware uploads | ClamAV virus scanner + magic-byte validation + image re-encoding |
  | Unauthorized access | Row-level security in Postgres + per-route permission guards |
  | Audit tampering | Hash-chained audit log + offsite forwarding |
  | DDoS / abuse | Cloudflare WAF + per-IP rate limits |
  | Leaked secrets | OIDC federation — no long-lived credentials in repo, secret scanning blocks PRs |
  | Legal/regulatory | Annual third-party security audit, BSP compliance review for escrow |

  **Plus annually:** professional penetration testing, OWASP Top 10 audit, dependency vulnerability scanning weekly.

  ---

  ### B5. How do you handle technical issues or downtime when they happen?

  We **assume incidents will happen** and prepare for them. Here's the response process.

  #### Detection (minutes 0–2)

  - Health checks ping every server every 30s
  - Synthetic transactions every 60s simulate buyer login + checkout — alert if any fail
  - Error monitoring (Sentry) auto-pages on-call engineer if crash rate spikes
  - Customer support has direct alert channel for user reports

  #### Response (minutes 2–15)

  - On-call engineer acknowledges within 5 min (24/7 rotation)
  - **Severity triage:**
    - **SEV-1** (full outage, payment broken, data leak risk) → all-hands, public status page updated within 15 min
    - **SEV-2** (single feature broken, partial slowdown) → on-call works it, status page if user-impacting
    - **SEV-3** (cosmetic, edge case) → ticket for next sprint
  - Rollback to previous version is the **default first move** if a recent deploy is suspected

  #### Resolution (minutes 15+)

  - Public status page (status.struktura.ph) shows what's broken + ETA
  - In-app banner explains the issue to logged-in users
  - Email update to affected users every 30 min during SEV-1
  - Postmortem within 48 hours — root cause, what we fixed, what we'll do to prevent recurrence
  - Customer compensation for any financial loss

  #### Backups + recovery

  - **Database snapshots** every hour (kept 30 days), every day (kept 1 year)
  - **File storage** backed up cross-region
  - **Point-in-time recovery** to any second in last 7 days
  - **RTO** (recovery time objective): < 1 hour
  - **RPO** (recovery point objective): < 5 minutes of data loss in worst case

  #### What we tell you

  You get:
  - Real-time status page link
  - Direct line to project manager during incidents
  - Monthly uptime + incident report (target: 99.9% = ~8h downtime/year max)

  ---

  ## C. Scalability & Future Development

  ### C1. Can the app handle more users and features as the business grows?

  **Yes — designed for it from day one.** Here's how.

  ---

  ## D. Multi-User Smoothness Plan (How We Scale)

  This section addresses the explicit ask: keep the app smooth even with many concurrent users.

  ### D1. Five layers of scaling

  #### Layer 1 — Edge (Cloudflare)
  - TLS termination, DDoS protection, WAF — handled outside our servers
  - Static assets (images, JS, CSS) served from 300+ edge locations worldwide
  - Result: app loads fast in Manila, Cebu, or Davao with the same speed

  #### Layer 2 — App servers (NestJS)
  - **Stateless API** — no session data on the server, so any server can serve any request
  - **Horizontal auto-scaling** — Railway/AWS adds new server instances when CPU > 70% or request queue > 100ms
  - Tested at 1,000 concurrent users on 4 instances; can scale to 10,000+ by adding instances
  - **Graceful shutdown** — old instances finish in-flight requests before being removed (no dropped connections during deploys)

  #### Layer 3 — Database (Postgres)
  - **Connection pooling** (PgBouncer) — 1 DB connection serves many app requests
  - **Read replicas** for heavy reports + analytics — main DB stays fast for transactions
  - **Indexes** on every query path (cursor-based pagination, no slow `OFFSET` scans)
  - **Materialized views** for dashboard stats (refreshed every 5 min, not on every page load)
  - Supabase Postgres scales vertically up to 16 vCPU + 64 GB RAM, then horizontally via partitioning

  #### Layer 4 — Cache (Redis)
  - User roles, profiles, hot product pages cached for 5 min
  - Cuts DB load by ~80% on common pages
  - Cache invalidated automatically when underlying data changes

  #### Layer 5 — Background queues (BullMQ)
  - Heavy work (PDF generation, email sending, virus scans, payout calculations) **never runs in the request path**
  - Worker pool scales independently from API
  - 10 named queues with separate concurrency limits — one slow queue can't block others
  - Failed jobs retry with exponential backoff, then move to dead-letter queue (ops gets digest)

  ---

  ### D2. Concurrent-use guarantees

  | Scenario | How we keep it smooth |
  |---|---|
  | **Two buyers buy the last unit** | Postgres row-level locking — one wins, the other gets an out-of-stock error before payment. No oversell ever. |
  | **Many contractors bid on same project** | Each bid insert is independent — no contention. Bid count cached, refreshed every 30s. |
  | **Buyer + contractor message at the same time** | Real-time chat via Supabase Realtime — handles 10,000+ concurrent connections per channel. |
  | **Admin reviews docs while user uploads** | Document workflow uses optimistic locking — admin always sees latest state. |
  | **Payout job runs while sellers add products** | Background queue runs on separate worker process — never affects API latency. |
  | **Sudden traffic spike (TV ad, viral post)** | Auto-scaling spins up new instances within 60s. Cloudflare absorbs initial spike. |
  | **One user spam-clicks "buy"** | Idempotency key on order endpoint — same request never processed twice. |
  | **Two admins approve the same dispute** | First write wins, second gets "already resolved" error. UI auto-refreshes. |

  ---

  ### D3. Capacity targets (v1 launch)

  | Metric | Target | How |
  |---|---|---|
  | Peak concurrent users | 10,000 | 4–8 API instances, auto-scaling |
  | Page load (P95) | < 2 seconds | CDN + cache + indexed queries |
  | API response (P95) | < 200 ms | Cache + read replicas + queries < 50ms |
  | Checkout success rate | > 99.5% | Idempotent endpoints + retries + monitoring |
  | Search latency | < 100 ms | Postgres FTS with GIN index |
  | Image upload | < 5 sec for 10MB | Direct-to-storage signed URLs |
  | Background job latency | virus scan < 30s, email < 60s | Worker concurrency tuned per queue |
  | Uptime | 99.9% (8h max downtime/year) | Multi-instance + auto-failover |

  ---

  ### D4. Growth path (1k → 100k → 1M users)

  | Stage | Users | What changes |
  |---|---|---|
  | **Launch** | up to 10,000 | Single region (Manila), 4–8 API instances, 1 DB primary + 1 read replica |
  | **Year 1** | up to 100,000 | Add second region (Cebu/Davao), more read replicas, dedicated worker pool, search → Elasticsearch |
  | **Year 2+** | 100,000 – 1M | Microservices extraction (only the modules that need it — likely escrow + notifications first), database partitioning by user region, multi-region active-active |
  | **Year 3+** | 1M+ | Custom infrastructure, dedicated SRE team, regional failover automation, ML-driven fraud detection |

  We **don't** over-engineer for year 3 on day one. We build for year 1, monitor, and scale when metrics demand it. This keeps initial costs predictable.

  ---

  ### D5. Future-feature path

  The architecture supports adding these without rewrites:
  - **AI assistant** for project scoping (plugs into estimation module)
  - **Logistics integration** (couriers, delivery scheduling)
  - **B2B bulk procurement** (volume pricing tier on top of marketplace)
  - **Insurance / warranty marketplace** (new module, same auth + payments)
  - **Multi-language** (i18n in place from day one — adding Cebuano, Ilocano, etc. is config work, not code)
  - **AR/VR room visualization** (separate feature flag, mobile-only)

  Each is a **module** — adding one doesn't disrupt the others.

  ---

  ## Quick-Reference Summary

  | Question | Short answer |
  |---|---|
  | Core features | 5 modules: Materials, Services, Bidding+Escrow, Verified Profiles, Estimation |
  | Different users | Each role sees a tailored dashboard; one platform, four primary user flows |
  | What's unique | All-in-one, milestone escrow, 5-tier verification, auto delay-compensation, PH-first, paid estimates |
  | Timeline | 10 mo minimum, 12–14 mo realistic, 6 phases, 2-week sprints |
  | Handling changes | Agile sprints, change-request budget, locked freeze 4 weeks before launch |
  | Tech stack | React + React Native + NestJS + Postgres + Supabase + Redis + Cloudflare. Mainstream + maintainable. |
  | Smooth + crash-free | Automated tests, staged rollouts, transactions, idempotency, monitoring, auto-restart |
  | Security | MFA, encryption, RLS, ClamAV, audit log, annual pentest |
  | Downtime response | < 5 min ack, < 15 min rollback, public status page, postmortem within 48h |
  | Scaling | Stateless API + auto-scaling + read replicas + Redis cache + background queues. Built for 10k concurrent at launch, 1M+ over time. |

  ---

  *Document version 1.0 · Prepared for client review*
