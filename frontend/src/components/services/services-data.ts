import {
  House04Icon,
  Building03Icon,
  Wrench01Icon,
  Tap01Icon,
  FlashIcon,
  PaintBrush01Icon,
  Plant02Icon,
  ToolsIcon,
} from "@hugeicons/core-free-icons"

export type ServiceCategory =
  | "Custom Home Build"
  | "Renovation"
  | "Roofing"
  | "Plumbing"
  | "Electrical"
  | "Painting"
  | "Landscaping"
  | "Repairs & Handyman"

export const serviceCategories: { name: ServiceCategory; icon: typeof House04Icon }[] = [
  { name: "Custom Home Build", icon: House04Icon },
  { name: "Renovation", icon: Building03Icon },
  { name: "Roofing", icon: ToolsIcon },
  { name: "Plumbing", icon: Tap01Icon },
  { name: "Electrical", icon: FlashIcon },
  { name: "Painting", icon: PaintBrush01Icon },
  { name: "Landscaping", icon: Plant02Icon },
  { name: "Repairs & Handyman", icon: Wrench01Icon },
]

export type ServiceReview = {
  author: string
  rating: number
  text: string
  date: string
}

export type ServicePackage = {
  name: string
  price: string
  duration: string
  description: string
}

export type ServicePro = {
  id: string
  name: string
  category: ServiceCategory
  location: string
  rating: number
  reviews: string
  jobsCompleted: number
  startingFrom: string
  blurb: string
  badge?: "Verified Pro" | "Top Rated" | "Quick Responder"
  image: string
  portfolio?: string[]
  packages?: ServicePackage[]
  customerReviews?: ServiceReview[]
}

export const servicePros: ServicePro[] = [
  {
    id: "heritage-build-co",
    name: "Heritage Build Co.",
    category: "Custom Home Build",
    location: "Cebu",
    rating: 4.9,
    reviews: "238",
    jobsCompleted: 142,
    startingFrom: "₱1.2M",
    blurb:
      "Ground-up coastal & hillside builds. 14 years of full-service GC work across Visayas.",
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "studio-manille",
    name: "Studio Manille",
    category: "Renovation",
    location: "Makati",
    rating: 4.8,
    reviews: "316",
    jobsCompleted: 220,
    startingFrom: "₱180k",
    blurb:
      "Kitchen, bath, and full-home remodels with on-site PM and weekly client updates.",
    badge: "Verified Pro",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "stormshield-roofing",
    name: "Stormshield Roofing",
    category: "Roofing",
    location: "Quezon City",
    rating: 4.7,
    reviews: "412",
    jobsCompleted: 380,
    startingFrom: "₱75k",
    blurb:
      "Re-roofing, leaks, gutters, and full replacement. 24-hour storm-damage response.",
    badge: "Quick Responder",
    image:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "aquaflow-plumbing",
    name: "AquaFlow Plumbing",
    category: "Plumbing",
    location: "Pasig",
    rating: 4.8,
    reviews: "528",
    jobsCompleted: 612,
    startingFrom: "₱2.5k",
    blurb:
      "Installs, repairs, fixtures, emergency call-outs. Licensed master plumbers.",
    badge: "Verified Pro",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "sparkline-electric",
    name: "Sparkline Electric",
    category: "Electrical",
    location: "Mandaluyong",
    rating: 4.9,
    reviews: "295",
    jobsCompleted: 184,
    startingFrom: "₱3k",
    blurb:
      "Wiring, panels, fixture installs, and code-compliant upgrades for residences and small commercial.",
    badge: "Verified Pro",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "procoat-finishing",
    name: "ProCoat Finishing Crew",
    category: "Painting",
    location: "Taguig",
    rating: 4.9,
    reviews: "640",
    jobsCompleted: 510,
    startingFrom: "₱120/sqm",
    blurb:
      "Interior and exterior painting with a 2-year finish warranty and free color consult.",
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "greenroot-landscaping",
    name: "Greenroot Landscaping",
    category: "Landscaping",
    location: "Tagaytay",
    rating: 4.7,
    reviews: "184",
    jobsCompleted: 92,
    startingFrom: "₱45k",
    blurb:
      "Garden builds, hardscape, irrigation, and lawn restoration for homes and small estates.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "boltworks-handyman",
    name: "BoltWorks Handyman",
    category: "Repairs & Handyman",
    location: "Quezon City",
    rating: 4.7,
    reviews: "1.1k",
    jobsCompleted: 920,
    startingFrom: "₱1.5k",
    blurb:
      "Doors, locks, drywall, tile, and small jobs done right. Same-day booking available.",
    badge: "Quick Responder",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop",
  },
]

export const proSortOptions = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Top rated" },
  { id: "jobs", label: "Most jobs completed" },
] as const

export type ProSortOption = (typeof proSortOptions)[number]["id"]

const defaultPortfolio = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=900&q=80&auto=format&fit=crop",
]

const defaultReviews: ServiceReview[] = [
  {
    author: "Maria S.",
    rating: 5,
    text: "On time, on budget, and the team was easy to coordinate with. Will hire again.",
    date: "2 weeks ago",
  },
  {
    author: "Carlo D.",
    rating: 5,
    text: "Communicated daily progress with photos. Quality finishing and clean handover.",
    date: "1 month ago",
  },
  {
    author: "Aileen R.",
    rating: 4,
    text: "Solid work overall. Some delays from supplier side but the team adjusted well.",
    date: "2 months ago",
  },
]

const defaultPackages: Record<string, ServicePackage[]> = {
  default: [
    { name: "Consult & estimate", price: "₱2,500", duration: "1 visit", description: "Site visit, scope review, written quote within 48h." },
    { name: "Standard package", price: "₱45,000", duration: "1–2 weeks", description: "Materials sourcing, labor, coordination, and weekly status." },
    { name: "Premium package", price: "₱120,000", duration: "3–4 weeks", description: "Full project mgmt, premium finishes, 2-year workmanship warranty." },
  ],
}

export function getServiceProDetail(pro: ServicePro): Required<
  Pick<ServicePro, "portfolio" | "packages" | "customerReviews">
> {
  return {
    portfolio: pro.portfolio ?? defaultPortfolio,
    packages: pro.packages ?? defaultPackages.default,
    customerReviews: pro.customerReviews ?? defaultReviews,
  }
}
