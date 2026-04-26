import type { ServiceCategory } from "@/components/services/services-data"

export type Job = {
  id: string
  title: string
  category: ServiceCategory
  location: string
  budget: string
  startWindow: string
  postedAgo: string
  bidCount: number
  description: string
  buyer: { name: string; verified: boolean }
}

export const jobs: Job[] = [
  {
    id: "j-001",
    title: "Re-roof a 120 sqm two-storey house",
    category: "Roofing",
    location: "Quezon City",
    budget: "₱100k – ₱500k",
    startWindow: "ASAP — within a week",
    postedAgo: "2h ago",
    bidCount: 3,
    description:
      "Existing roof is rusted GI. Need full re-roof in colored steel, with new gutters and downspouts. Ladder access OK from carport side.",
    buyer: { name: "Marlon R.", verified: true },
  },
  {
    id: "j-002",
    title: "Kitchen renovation — full remodel with new layout",
    category: "Renovation",
    location: "Makati",
    budget: "₱500k – ₱2M",
    startWindow: "In the next 2–4 weeks",
    postedAgo: "5h ago",
    bidCount: 5,
    description:
      "Strip the existing 18sqm kitchen down to walls. New cabinetry, granite tops, range hood, and re-tiled flooring. Plans available on request.",
    buyer: { name: "Elena M.", verified: true },
  },
  {
    id: "j-003",
    title: "Master bath leak repair + retiling",
    category: "Plumbing",
    location: "Pasig",
    budget: "₱25k – ₱100k",
    startWindow: "ASAP — within a week",
    postedAgo: "8h ago",
    bidCount: 2,
    description:
      "Leak from second-floor bathroom dripping into ceiling below. Need to find source, repair, and retile a 6sqm wet area.",
    buyer: { name: "Daniel O.", verified: false },
  },
  {
    id: "j-004",
    title: "Build a 220 sqm coastal home (turnkey)",
    category: "Custom Home Build",
    location: "Cebu",
    budget: "₱2M+",
    startWindow: "1–3 months out",
    postedAgo: "1d ago",
    bidCount: 7,
    description:
      "Architect-drawn plans ready. Single-family home on a 480 sqm beachfront lot. Concrete frame, hardwood interiors, full electrical + plumbing.",
    buyer: { name: "Marisol T.", verified: true },
  },
  {
    id: "j-005",
    title: "Whole-house exterior repaint + minor patching",
    category: "Painting",
    location: "Taguig",
    budget: "₱100k – ₱500k",
    startWindow: "In the next 2–4 weeks",
    postedAgo: "1d ago",
    bidCount: 4,
    description:
      "180 sqm exterior with hairline cracks and a few stained sections. Want a 2-coat acrylic finish; need color consult included.",
    buyer: { name: "Renata C.", verified: true },
  },
  {
    id: "j-006",
    title: "Service panel upgrade — 60A to 100A",
    category: "Electrical",
    location: "Mandaluyong",
    budget: "₱25k – ₱100k",
    startWindow: "ASAP — within a week",
    postedAgo: "2d ago",
    bidCount: 6,
    description:
      "1980s-era service entrance, want to upgrade to 100A panel with new breakers. Existing wiring inside the home is OK; just replacing the panel + meter base.",
    buyer: { name: "Adi S.", verified: true },
  },
  {
    id: "j-007",
    title: "Backyard hardscape + irrigation",
    category: "Landscaping",
    location: "Tagaytay",
    budget: "₱100k – ₱500k",
    startWindow: "1–3 months out",
    postedAgo: "3d ago",
    bidCount: 2,
    description:
      "300 sqm yard. Want a flagstone patio (about 30 sqm), drip irrigation across 3 garden beds, and a low retaining wall.",
    buyer: { name: "Priya H.", verified: false },
  },
  {
    id: "j-008",
    title: "Fix sticking front door + replace deadbolt",
    category: "Repairs & Handyman",
    location: "Quezon City",
    budget: "Under ₱25k",
    startWindow: "ASAP — within a week",
    postedAgo: "3d ago",
    bidCount: 8,
    description:
      "Solid wood door, frame settled. Door catches on the strike plate. Want it planed and a new deadbolt + handleset installed. Same-day if possible.",
    buyer: { name: "Jonas P.", verified: true },
  },
  {
    id: "j-009",
    title: "Two-storey extension over existing carport",
    category: "Renovation",
    location: "Muntinlupa",
    budget: "₱2M+",
    startWindow: "1–3 months out",
    postedAgo: "4d ago",
    bidCount: 4,
    description:
      "Add a 60sqm second floor over the existing carport. Plans drafted, permits started. Need a GC who can deliver in ~4 months.",
    buyer: { name: "Cara L.", verified: true },
  },
]

export const jobSortOptions = [
  { id: "recent", label: "Most recent" },
  { id: "budget-desc", label: "Budget: high to low" },
  { id: "bids-asc", label: "Fewest bids (less competition)" },
] as const

export type JobSortOption = (typeof jobSortOptions)[number]["id"]
