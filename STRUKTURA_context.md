# STRUKTURA — Project Context

> Construction Marketplace Platform | Technical Planning Document v1.0 (Pre-Development Draft, 2025)

---

## What is STRUKTURA?

STRUKTURA is a **commission-based construction marketplace** connecting homeowners and developers with hardware suppliers, contractors, and construction companies — all within a single secure digital platform.

It operates similarly to Shopee (product marketplace), extended into the service economy:
- Hardware stores list and sell construction materials
- Companies post services (architectural, electrical, plumbing, etc.)
- Contractors bid on client-posted projects
- A verified badge/credentialing system builds trust

---

## Business Model

| Revenue Stream | Platform Cut |
|---|---|
| Product Sales Commission | 5–15% per transaction |
| Service Listing Commission | 8–12% per service |
| Contractor Bid Commission | Negotiable % per project |
| Fair Cost Estimation (paid service) | Full fee |
| Featured Contractor Slot | Fixed monthly fee |

---

## Platform Participants

| Actor | Role | Primary Actions |
|---|---|---|
| Homeowner / Client | Demand side | Buy materials, post projects, hire |
| Hardware Store / Supplier | Supply side | List & sell materials |
| Contractor | Service provider | Bid on projects, manage portfolio |
| Service Company | Service provider | Post services, accept bookings |

---

## Five Core Modules

### Module 1 — Construction Materials Marketplace
- Hardware stores register, list products, and sell to clients
- Platform earns commission on each completed sale
- Features: product catalog (SKU, categories, pricing, stock), advanced search/filter, cart + checkout, order tracking, seller dashboard, buyer reviews
- Commission deducted automatically at checkout; bi-weekly payout cycle

### Module 2 — Service Company Listings
- Companies create profiles and post services with pricing, coverage area, and portfolio
- Features: company profile, service posting, portfolio upload, verified badge after admin document review, client booking via platform messaging, reviews/ratings

### Module 3 — Contractor Bidding System
- Clients post projects; contractors submit competitive bids
- **Client side:** project title, category, location, scope, budget range, timeline, visibility settings
- **Contractor side:** bid amount with itemized breakdown, timeline with milestones, portfolio samples, cover message
- **Escrow payment flow:** funds held on hire, released per milestone approval; final payment on project sign-off

### Module 4 — Contractor Profiles & Portfolio
- Profile: photo, trade specialization, years of experience, expertise tags, certifications, portfolio gallery, work history, star ratings, availability calendar
- **Verified Badge Levels:**
  - Unverified — basic registration only
  - Identity Verified — government ID reviewed
  - License Verified — professional/trade license validated
  - Portfolio Verified — min. 3 portfolio projects approved
  - Top Rated — 4.5+ stars, 10+ completed projects, license verified
- Featured Contractor: premium placement, purchasable or auto-awarded to Top Rated

### Module 5 — Fair Cost Estimation Service
- Premium paid service; client pays upfront (e.g., PHP 500–2,000) before receiving estimate
- Flow: client fills intake form → pays → estimator assigned → detailed cost breakdown delivered within 2–5 business days → downloadable PDF
- Report includes: itemized material list, labor breakdown by trade, 10–15% contingency buffer, regional price adjustment, 30-day validity note

---

## Project Lifecycle (Module 3 Detail)

| Stage | Description |
|---|---|
| 1. Project Posted | Client creates listing with scope, budget, timeline |
| 2. Bidding Open | Contractors submit bids within a bidding window |
| 3. Contractor Awarded | Client selects contractor; agreement generated |
| 4. Contract Signed | Both parties digitally confirm agreement and milestones |
| 5. Active — In Progress | Work underway; contractor updates per milestone |
| 6. Milestone Reviews | Client reviews and approves each milestone |
| 7. Project Completion | Final milestone approved; last escrow payment released |
| 8. Review & Archive | Client submits rating; project closed |

### Timeline & Grace Period
- Each project includes a **1–2 month grace period** negotiated at signing
- Alert system: yellow at 14 days out → orange during grace period → red when grace expires
- **Delay compensation:** pre-agreed rate (e.g., PHP X/day or % of contract value), auto-calculated by background job, deducted from escrow payout

### Dispute Resolution
- Either party may escalate; platform dispute officer reviews all evidence (photos, messages, timeline) and makes a binding determination

---

## Technical Architecture

### Technology Stack

| Layer | Technology |
|---|---|
| Mobile App (Primary) | React Native (iOS + Android) |
| Web App (Admin Panel) | Next.js (React, SSR) |
| Backend API | NestJS with Clean Architecture |
| Database | PostgreSQL via Prisma ORM |
| Authentication | Supabase Auth (JWT, OAuth, email) |
| File Storage | Supabase Storage |
| Background Jobs | BullMQ + Redis |
| Payment Processing | PayMongo or Paynamics (PH-compliant) |
| Real-time | Supabase Realtime (chat, notifications) |
| Search | PostgreSQL full-text → Elasticsearch at scale |
| CDN | Cloudflare |
| Hosting | Railway or AWS |

### User Roles & Permissions

| Role | Access | Can Create | Can Transact |
|---|---|---|---|
| Guest | Browse only | Nothing | Cannot checkout |
| Client / Homeowner | Full client features | Projects, reviews, requests | Buy materials, hire contractors |
| Hardware Seller | Seller dashboard | Products, catalog | Receive payouts |
| Contractor | Contractor dashboard | Bids, portfolio | Receive project payments |
| Service Company | Company dashboard | Services, portfolio | Receive service payments |
| Platform Admin | Full admin panel | Anything | Override any transaction |

### Key Technical Decisions
- Commission deduction is **atomic** — never partial or lossy
- Escrow uses a **dedicated ledger table** tracking: hold, release, refund, compensation states
- Document uploads (licenses, permits, portfolios) in **restricted-access storage buckets** (admin-only)
- Contractor ratings use a **weighted rolling average** (recent reviews weighted higher)
- Notifications: push, email, and in-app simultaneously per user preference
- Grace period and delay compensation calculations run via **BullMQ scheduled jobs**, not on user request

---

## Development Phases

| Phase | Scope | Duration | Cumulative |
|---|---|---|---|
| 1 | Foundation & Architecture | 4 weeks | Month 1 |
| 2 | Materials Marketplace | 6 weeks | Month 2.5 |
| 3 | Contractor System & Bidding | 8 weeks | Month 4.5 |
| 4 | Progress Tracking & Services | 8 weeks | Month 6.5 |
| 5 | Estimation & Premium Features | 6 weeks | Month 8 |
| 6 | QA, Hardening & Launch | 8 weeks | Month 10 |

**Total: 10 months minimum; 12–14 months realistic with contingency.**

**Assumed team:** 1 PM, 2 Backend Devs, 2 Frontend/Mobile Devs, 1 UI/UX Designer, 1 QA Engineer

---

## Risk Register (Summary)

| Risk | Impact | Likelihood |
|---|---|---|
| Payment gateway delays/rejection | High | Medium |
| Apple App Store rejection | High | Low |
| Contractor fraud / fake portfolios | High | Medium |
| Scope creep from client requests | Medium | High |
| Low initial contractor adoption | Medium | Medium |
| Escrow model regulatory non-compliance (BSP) | High | Low |
| Performance issues at scale | Medium | Low |
| Slow client approval feedback | Medium | High |

---

## Out of Scope — v1.0

- AI chatbot / scope generator
- AR/VR room visualization
- Logistics/delivery partner integration
- Insurance or warranty marketplace
- B2B bulk procurement module
- Multi-language (beyond English and Filipino)
- Crypto / digital wallet payments
- Consumer-facing desktop web app (admin panel web IS in scope)

---

## Next Steps (Pre-Development)

- Client sign-off on this document
- Requirements Workshop (2–3 hours) to confirm edge cases per module
- UI/UX wireframing begins (Phase 1 kickoff)
- Database schema presented to client for approval
- Legal review of escrow model for BSP compliance
- Payment gateway applications submitted (PayMongo or Paynamics)
- Contractor seed recruitment plan drafted
- Formal project kickoff meeting scheduled

---

*Source: STRUKTURA Technical Planning Document v1.0 — Confidential, 2025*
