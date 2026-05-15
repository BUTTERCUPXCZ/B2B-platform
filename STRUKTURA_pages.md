# STRUKTURA — All Pages & Features

> 51 routes across 9 major sections. Frontend: React 19 + TanStack Router. Backend: not yet implemented.

---

## 1. PUBLIC / MARKETING

### `/` — Landing Page
- Hero section (headline, CTA buttons: Browse marketplace, Sell on STRUKTURA)
- About section (tabbed: For Buyers / For Sellers / For Contractors)
- What We Do (capability cards: listings, bidding, escrow, delivery)
- Process section (step-by-step how it works)
- Featured Projects showcase
- Testimonials / social proof
- Quote/inquiry form
- Sell on STRUKTURA promo band
- Footer (nav links, newsletter signup, socials)

### `/platform` — Platform Overview
- Feature breakdown by capability
- Capability navigation (tabs/sections)
- Integrations strip
- Security strip
- Platform hero

### `/solutions` — Solutions by Persona
- Homeowners, Hardware Suppliers, Contractors, Service Companies
- Use-case breakdown per persona

### `/pricing` — Pricing
- Pricing tier cards (Free / Pro / Enterprise)
- Feature comparison table
- Enterprise contact band
- FAQ accordion

### `/resources` — Resources / Help Center
- Blog posts / guides
- Webinars
- Documentation links

### `/contact` — Contact
- Contact form
- Office locations grid

### `/sell` — Sell on STRUKTURA
- Seller onboarding info
- Benefits, steps to list, commission info

---

## 2. AUTH

### `/auth/login` — Login
- Email + password form
- Google OAuth button
- Apple OAuth button
- Link to signup

### `/auth/signup` — Sign Up
- Role selector (Buyer / Seller / Contractor)
- Email + password form
- Link to login

---

## 3. MATERIALS MARKETPLACE

### `/shop` — Shop / Product Catalog
- Search bar
- Category filter sidebar (Cement, Steel, Lumber, Tiles, Paint, etc.)
- Price range filter
- Sort (Most popular, Price low→high, Price high→low, Top rated)
- Product grid (12 listings)
- Mobile filter drawer

### `/shop/$productId` — Product Detail
- Product images
- Product name, category, supplier, rating, reviews
- Price + old price (discount badge)
- Add to cart button
- Product description
- Supplier info

### `/cart` — Shopping Cart
- Cart item list (name, qty, price)
- Quantity controls
- Remove item
- Subtotal, commission (5%), total
- Proceed to checkout CTA

### `/checkout` — Checkout
- Order summary
- Shipping address form
- Payment method selection
- Escrow payment flow
- Place order CTA

### `/checkout/success` — Order Confirmation
- Order number
- Summary of items ordered
- Estimated delivery info
- Continue shopping CTA

---

## 4. JOBS / BIDDING

### `/jobs` — Jobs Listing
- Job cards (title, budget, trade, location, posted date)
- Search + filter (trade, location, budget)
- Post a job CTA

### `/jobs/post` — Post a Job
- Job title, description
- Trade category selector
- Budget range
- Location
- Timeline / urgency
- Submit form

### `/jobs/$jobId` — Job Detail
- Full job description
- Budget, trade, location, timeline
- Client info
- Bids submitted count
- Submit bid CTA

### `/jobs/$jobId/bid` — Submit Bid
- Bid amount input
- Proposed timeline
- Cover message / pitch
- Attachment upload (optional)
- Submit bid button

---

## 5. SERVICES

### `/services` — Services Listing
- Service cards (company, category, price range, rating)
- Filter by category (Architecture, Electrical, Plumbing, etc.)
- Search bar

### `/services/post` — Post a Service
- Service title, description
- Category selector
- Pricing / rate type
- Coverage area
- Portfolio images upload
- Submit form

### `/services/$serviceId` — Service Detail
- Company profile
- Service description
- Pricing breakdown
- Portfolio gallery
- Reviews
- Book / Contact CTA

---

## 6. CONTRACTORS

### `/contractors` — Contractors Listing
- Contractor cards (name, trade, rating, verified badge, location)
- Filter by trade, location, availability
- Search bar

### `/contractors/$contractorId` — Contractor Profile
- Profile photo, name, trade, location
- Verified badge
- Bio / about
- Portfolio gallery
- Skills / certifications
- Reviews + ratings
- Availability calendar
- Hire / Message CTA

---

## 7. PROJECTS

### `/projects/$projectId` — Project Detail
- Project title, description, status
- Client info
- Milestones timeline
- Escrow ledger (funds held, released, disputed)
- Contractor info
- Dispute resolution CTA
- Progress photos

---

## 8. ESTIMATES

### `/estimate` — Estimate Request
- Multi-step wizard: project type → scope → materials → location
- AI-powered cost estimation form

### `/estimate/report/$estimateId` — Estimate Report
- Itemized cost breakdown (materials, labor, contingency)
- Total estimated cost
- PDF download / share
- Request quotes from contractors CTA

### `/estimate/success` — Estimate Submitted
- Confirmation message
- Next steps
- Link to report

---

## 9. MESSAGES

### `/messages` — Messaging Inbox
- Conversation list (user avatar, name, last message, timestamp)
- Message thread view
- Send message input
- File attachment (optional)

---

## 10. DASHBOARD (Role-Based)

All dashboards use a sidebar nav + main content layout with internal scrolling.

### `/dashboard` — Dashboard Hub
- Role selector / redirect to role-specific dashboard

---

### CLIENT DASHBOARD

#### `/dashboard/client` — Client Home
- Overview stats (active projects, orders, estimates)
- Recent activity feed
- Quick action cards

#### `/dashboard/client/jobs` — My Posted Jobs
- Table of jobs posted by client
- Status (open, bidding, hired, completed)
- View bids CTA per job

#### `/dashboard/client/projects` — My Projects
- Active and past projects
- Progress status per project
- Link to project detail

#### `/dashboard/client/estimates` — My Estimates
- List of estimate requests
- Status (pending, ready)
- View report CTA

#### `/dashboard/client/orders` — My Orders
- Order history table
- Order status (processing, shipped, delivered)
- Reorder / track CTA

---

### SELLER DASHBOARD

#### `/dashboard/seller` — Seller Home
- Revenue summary (today, this week, this month)
- Orders to fulfill count
- Top-selling products
- Payout balance

#### `/dashboard/seller/catalog` — Product Catalog
- Product list table (name, SKU, stock, price, status)
- Add product CTA
- Edit / delete product
- Bulk actions

#### `/dashboard/seller/orders` — Orders Received
- Incoming orders table
- Order status management (confirm, ship, complete)
- Buyer info per order

#### `/dashboard/seller/reviews` — Customer Reviews
- Reviews list (rating, comment, buyer, product, date)
- Reply to review

#### `/dashboard/seller/payouts` — Payouts
- Payout history table (amount, date, status)
- Current balance
- Request payout CTA
- Bank account settings

---

### CONTRACTOR DASHBOARD

#### `/dashboard/contractor` — Contractor Home
- Active bids count
- Win rate stat
- Earnings this month
- Upcoming project milestones

#### `/dashboard/contractor/bids` — My Bids
- Submitted bids table (job title, bid amount, status, date)
- Pending / won / lost / withdrawn tabs

#### `/dashboard/contractor/projects` — My Projects
- Active projects list
- Milestones per project
- Mark milestone complete
- Upload progress photos

#### `/dashboard/contractor/earnings` — Earnings
- Earnings history table
- Total earned, pending payout
- Payout schedule info

---

### SERVICE COMPANY DASHBOARD

#### `/dashboard/company` — Company Home
- Booking requests count
- Active services count
- Revenue summary
- Recent bookings

#### `/dashboard/company/services` — My Services
- Services list (name, category, price, status)
- Add / edit / deactivate service
- Portfolio management

#### `/dashboard/company/bookings` — Bookings
- Incoming bookings table
- Status (pending, confirmed, in-progress, completed)
- Accept / decline booking

#### `/dashboard/company/payouts` — Payouts
- Payout history
- Current balance
- Request payout CTA

---

### ADMIN DASHBOARD

#### `/dashboard/admin` — Admin Home
- Platform-wide stats (GMV, active users, disputes open)
- Activity charts
- System health overview

#### `/dashboard/admin/disputes` — Dispute Management
- Open disputes table (project, parties, amount, date)
- Review dispute detail
- Issue ruling (refund / release escrow)

#### `/dashboard/admin/reports` — Reports
- Revenue reports by period
- User growth charts
- Transaction volume
- Export to CSV

#### `/dashboard/admin/verifications` — Verification Queue
- Pending contractor / company verifications
- KYC document review
- Approve / reject with notes

---

## SUMMARY TABLE

| Section | Page Count |
|---|---|
| Public / Marketing | 7 |
| Auth | 2 |
| Materials Marketplace | 5 |
| Jobs / Bidding | 4 |
| Services | 3 |
| Contractors | 2 |
| Projects | 1 |
| Estimates | 3 |
| Messages | 1 |
| Dashboard (all roles) | 23 |
| **Total** | **51** |

---

## TECH STACK (Frontend)

- **Framework:** React 19 + TanStack Router v1 (file-based routing)
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Fonts:** Poppins (headings) + Inter (body)
- **State:** React Context (cart, role, theme) + localStorage
- **Icons:** HugeIcons
- **Charts:** Recharts
- **Animations:** Motion (Framer)
- **Backend:** Not yet implemented (Supabase Auth + NestJS planned)
- **Payments:** PayMongo / Paynamics (Philippines, planned)
- **All data is currently mock/static**
