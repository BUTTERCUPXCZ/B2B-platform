import {
  ShoppingBag03Icon,
  CustomerService01Icon,
  TruckDeliveryIcon,
  Shield01Icon,
  Store02Icon,
  Wrench01Icon,
  AnalyticsUpIcon,
  CheckmarkBadge02Icon,
} from "@hugeicons/core-free-icons"

export type Capability = {
  id: string
  audience: "Buyers" | "Sellers"
  icon: typeof ShoppingBag03Icon
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  image: string
}

export const capabilities: Capability[] = [
  // ---------- Buyer-side surfaces ----------
  {
    id: "marketplace",
    audience: "Buyers",
    icon: ShoppingBag03Icon,
    eyebrow: "For Buyers · 01",
    title: "Browse 24,000+ verified listings",
    body: "One catalog, every construction material — cement, rebar, tiles, paint, tools, fixtures, plumbing, electrical, and more — from 200+ identity-verified suppliers across the country.",
    bullets: [
      "Side-by-side price and review comparison",
      "Real-time stock and lead-time per supplier",
      "Saved carts and reorder-from-history",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "quotes",
    audience: "Buyers",
    icon: CustomerService01Icon,
    eyebrow: "For Buyers · 02",
    title: "Post a job, compare bids in 24 hours",
    body: "Tell us what you need built — a roof repair, a kitchen renovation, a full-house build — and get up to 5 priced bids from verified contractors within a business day.",
    bullets: [
      "One job post reaches every relevant pro",
      "Apples-to-apples bid comparison",
      "Hire on price, rating, or earliest start date",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "escrow",
    audience: "Buyers",
    icon: Shield01Icon,
    eyebrow: "For Buyers · 03",
    title: "Escrow payments, milestone-based",
    body: "Your money sits in escrow until you sign off on each milestone. If a job goes sideways, our dispute team mediates — and refunds you if the work was undelivered.",
    bullets: [
      "Funds released only after milestone sign-off",
      "Built-in dispute resolution",
      "Quality guarantee on all material orders",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "delivery",
    audience: "Buyers",
    icon: TruckDeliveryIcon,
    eyebrow: "For Buyers · 04",
    title: "Doorstep — or jobsite — delivery",
    body: "Schedule deliveries to a home, a yard, or an active jobsite. Track every order in real time. The Buildora driver knows the gate code and where to drop your cement.",
    bullets: [
      "Schedule by hour, not by day",
      "Live tracking from supplier to gate",
      "Bulk and oversize freight handled in-house",
    ],
    image:
      "https://images.unsplash.com/photo-1601158935942-52255782d322?w=1200&q=80&auto=format&fit=crop",
  },

  // ---------- Seller-side surfaces ----------
  {
    id: "storefront",
    audience: "Sellers",
    icon: Store02Icon,
    eyebrow: "For Sellers · 05",
    title: "Launch your storefront in minutes",
    body: "Upload your catalog by CSV, set your prices and stock, choose your delivery zones, and you&rsquo;re live. We handle hosting, search, payments, and buyer support.",
    bullets: [
      "CSV import or manual listings",
      "Per-buyer contract pricing & bulk tiers",
      "Custom storefront URL with your branding",
    ],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "services",
    audience: "Sellers",
    icon: Wrench01Icon,
    eyebrow: "For Sellers · 06",
    title: "Win construction jobs that fit you",
    body: "List your services and we route matching jobs your way — by trade, by location, by ticket size. Send a bid, win the work, deliver, get paid through escrow.",
    bullets: [
      "Pre-filtered job feed in your trade",
      "Templated bids with markup rules",
      "Verified-pro badge boosts win rate by 3.2×",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "dashboard",
    audience: "Sellers",
    icon: AnalyticsUpIcon,
    eyebrow: "For Sellers · 07",
    title: "Seller dashboard & weekly payouts",
    body: "Track orders, returns, and bids in one place. See which listings convert. Get paid every Friday — straight to your bank, no waiting on consolidated invoices.",
    bullets: [
      "Realtime sales & conversion KPIs",
      "Weekly automated payouts",
      "Refund and return management built-in",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "trust",
    audience: "Sellers",
    icon: CheckmarkBadge02Icon,
    eyebrow: "For Sellers · 08",
    title: "Verified-pro badge, buyer trust included",
    body: "Identity verification, license checks, and buyer ratings are surfaced on every listing. Sellers who hit a 4.7+ rating earn the verified-pro badge — and 3× the listing reach.",
    bullets: [
      "ID + license verification",
      "Buyer reviews on every order",
      "Top-pro placement boost over 4.7★",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop",
  },
]
