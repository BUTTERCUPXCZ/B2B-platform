import type { ServiceCategory } from "@/components/services/services-data"
import type { BadgeLevel } from "@/components/shared/verified-badge"

export type ContractorReview = {
  author: string
  rating: number
  text: string
  date: string
}

export type PortfolioItem = {
  id: string
  title: string
  image: string
  year: number
}

export type Certification = {
  name: string
  issuer: string
  year: number
}

export type WorkHistoryItem = {
  jobTitle: string
  client: string
  year: number
  value: string
}

export type AvailabilityCell = {
  date: string // YYYY-MM-DD
  status: "available" | "booked" | "tentative"
}

export type Contractor = {
  id: string
  name: string
  avatar: string
  trade: ServiceCategory
  location: string
  yearsExperience: number
  expertiseTags: string[]
  certifications: Certification[]
  badgeLevel: BadgeLevel
  featured: boolean
  rating: number
  reviewCount: number
  jobsCompleted: number
  startingFrom: string
  bio: string
  portfolio: PortfolioItem[]
  workHistory: WorkHistoryItem[]
  availability: AvailabilityCell[]
  reviews: ContractorReview[]
}

const portfolioImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=900&q=80&auto=format&fit=crop",
]

function makePortfolio(prefix: string, count = 6): PortfolioItem[] {
  const titles = [
    "Three-storey home build",
    "Kitchen renovation",
    "Roof replacement",
    "Bathroom retiling",
    "Exterior repaint",
    "Landscape redesign",
  ]
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    title: titles[i % titles.length],
    image: portfolioImages[i % portfolioImages.length],
    year: 2024 - (i % 3),
  }))
}

function makeAvailability(): AvailabilityCell[] {
  const start = new Date()
  start.setDate(1)
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const dow = d.getDay()
    let status: AvailabilityCell["status"] = "available"
    if (dow === 0) status = "booked"
    else if (i % 6 === 0) status = "tentative"
    else if (i % 4 === 0) status = "booked"
    return { date: d.toISOString().slice(0, 10), status }
  })
}

const baseReviews: ContractorReview[] = [
  { author: "Maria S.", rating: 5, text: "Delivered on time, quality finishing.", date: "2 weeks ago" },
  { author: "Carlo D.", rating: 5, text: "Crew was professional and tidy. Daily updates.", date: "1 month ago" },
  { author: "Aileen R.", rating: 4, text: "Solid work overall. Minor delay due to weather.", date: "2 months ago" },
  { author: "Renz B.", rating: 5, text: "Great communication, fair pricing.", date: "3 months ago" },
]

const baseHistory: WorkHistoryItem[] = [
  { jobTitle: "Single-family home turnkey", client: "Cruz family", year: 2024, value: "₱4.2M" },
  { jobTitle: "Kitchen + bath remodel", client: "Reyes family", year: 2023, value: "₱950k" },
  { jobTitle: "Office fit-out", client: "Cipher Coworks", year: 2023, value: "₱1.8M" },
]

export const contractors: Contractor[] = [
  {
    id: "stormshield-roofing",
    name: "Stormshield Roofing",
    avatar:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=300&q=80&auto=format&fit=crop",
    trade: "Roofing",
    location: "Quezon City",
    yearsExperience: 12,
    expertiseTags: ["Re-roofing", "Gutters", "Storm-damage", "Insulated panels"],
    certifications: [
      { name: "PCAB License A", issuer: "PCAB", year: 2018 },
      { name: "Roofing Contractor Cert.", issuer: "Manila Build Assn.", year: 2020 },
    ],
    badgeLevel: "license",
    featured: true,
    rating: 4.7,
    reviewCount: 412,
    jobsCompleted: 380,
    startingFrom: "₱75k",
    bio: "Full-service roofing crew specializing in re-roofs and storm response across Metro Manila.",
    portfolio: makePortfolio("ssr"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "studio-manille",
    name: "Studio Manille",
    avatar:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=300&q=80&auto=format&fit=crop",
    trade: "Renovation",
    location: "Makati",
    yearsExperience: 10,
    expertiseTags: ["Kitchen", "Bath", "Full remodel", "3D mockups"],
    certifications: [
      { name: "PCAB License B", issuer: "PCAB", year: 2019 },
      { name: "Interior Design (UAP)", issuer: "UAP", year: 2017 },
    ],
    badgeLevel: "portfolio",
    featured: true,
    rating: 4.8,
    reviewCount: 316,
    jobsCompleted: 220,
    startingFrom: "₱180k",
    bio: "Boutique remodel studio with on-site PM and weekly client updates.",
    portfolio: makePortfolio("sm"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "heritage-build-co",
    name: "Heritage Build Co.",
    avatar:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80&auto=format&fit=crop",
    trade: "Custom Home Build",
    location: "Cebu",
    yearsExperience: 14,
    expertiseTags: ["Coastal", "Hillside", "Concrete frame", "Hardwood"],
    certifications: [
      { name: "PCAB License A", issuer: "PCAB", year: 2014 },
      { name: "Civil Engineer (PRC)", issuer: "PRC", year: 2010 },
    ],
    badgeLevel: "top-rated",
    featured: true,
    rating: 4.9,
    reviewCount: 238,
    jobsCompleted: 142,
    startingFrom: "₱1.2M",
    bio: "Ground-up coastal and hillside builds across Visayas. Architect-grade finishing.",
    portfolio: makePortfolio("hbc"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "aquaflow-plumbing",
    name: "AquaFlow Plumbing",
    avatar:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&q=80&auto=format&fit=crop",
    trade: "Plumbing",
    location: "Pasig",
    yearsExperience: 9,
    expertiseTags: ["Leak repair", "Fixtures", "Re-piping", "Emergency"],
    certifications: [
      { name: "Master Plumber (PRC)", issuer: "PRC", year: 2018 },
    ],
    badgeLevel: "license",
    featured: false,
    rating: 4.8,
    reviewCount: 528,
    jobsCompleted: 612,
    startingFrom: "₱2.5k",
    bio: "Licensed master plumbers with 24-hour emergency response.",
    portfolio: makePortfolio("afp"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "sparkline-electric",
    name: "Sparkline Electric",
    avatar:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80&auto=format&fit=crop",
    trade: "Electrical",
    location: "Mandaluyong",
    yearsExperience: 8,
    expertiseTags: ["Service panels", "Wiring", "Code upgrades"],
    certifications: [
      { name: "Master Electrician (PRC)", issuer: "PRC", year: 2017 },
    ],
    badgeLevel: "license",
    featured: false,
    rating: 4.9,
    reviewCount: 295,
    jobsCompleted: 184,
    startingFrom: "₱3k",
    bio: "Code-compliant electrical work for residences and small commercial.",
    portfolio: makePortfolio("se"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "procoat-finishing",
    name: "ProCoat Finishing Crew",
    avatar:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&q=80&auto=format&fit=crop",
    trade: "Painting",
    location: "Taguig",
    yearsExperience: 11,
    expertiseTags: ["Interior", "Exterior", "Color consult", "2-yr warranty"],
    certifications: [
      { name: "PCAB License C", issuer: "PCAB", year: 2019 },
    ],
    badgeLevel: "top-rated",
    featured: true,
    rating: 4.9,
    reviewCount: 640,
    jobsCompleted: 510,
    startingFrom: "₱120/sqm",
    bio: "Painting crew with 2-year finish warranty and free color consult.",
    portfolio: makePortfolio("pcf"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "greenroot-landscaping",
    name: "Greenroot Landscaping",
    avatar:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80&auto=format&fit=crop",
    trade: "Landscaping",
    location: "Tagaytay",
    yearsExperience: 7,
    expertiseTags: ["Hardscape", "Irrigation", "Lawns", "Garden builds"],
    certifications: [],
    badgeLevel: "portfolio",
    featured: false,
    rating: 4.7,
    reviewCount: 184,
    jobsCompleted: 92,
    startingFrom: "₱45k",
    bio: "Garden builds, hardscape, and irrigation for homes and small estates.",
    portfolio: makePortfolio("grl"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "boltworks-handyman",
    name: "BoltWorks Handyman",
    avatar:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&q=80&auto=format&fit=crop",
    trade: "Repairs & Handyman",
    location: "Quezon City",
    yearsExperience: 5,
    expertiseTags: ["Doors", "Locks", "Drywall", "Tile"],
    certifications: [],
    badgeLevel: "identity",
    featured: false,
    rating: 4.7,
    reviewCount: 1100,
    jobsCompleted: 920,
    startingFrom: "₱1.5k",
    bio: "Same-day handyman service for small home jobs. Doors, locks, drywall, tile.",
    portfolio: makePortfolio("bwh"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "metroshield-pro",
    name: "Metroshield Pro",
    avatar:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=80&auto=format&fit=crop",
    trade: "Roofing",
    location: "Caloocan",
    yearsExperience: 6,
    expertiseTags: ["Steel roofing", "Gutters"],
    certifications: [{ name: "PCAB License C", issuer: "PCAB", year: 2021 }],
    badgeLevel: "portfolio",
    featured: false,
    rating: 4.5,
    reviewCount: 188,
    jobsCompleted: 142,
    startingFrom: "₱60k",
    bio: "Steel re-roofing and gutter replacement for residential properties.",
    portfolio: makePortfolio("msp"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
  {
    id: "skyline-roof-co",
    name: "Skyline Roof Co.",
    avatar:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80&auto=format&fit=crop",
    trade: "Roofing",
    location: "Marikina",
    yearsExperience: 8,
    expertiseTags: ["Premium steel", "Metal flashing", "Warranty"],
    certifications: [{ name: "PCAB License B", issuer: "PCAB", year: 2020 }],
    badgeLevel: "top-rated",
    featured: false,
    rating: 4.9,
    reviewCount: 96,
    jobsCompleted: 78,
    startingFrom: "₱90k",
    bio: "Premium-tier roofing crew with 5-year workmanship warranty.",
    portfolio: makePortfolio("skl"),
    workHistory: baseHistory,
    availability: makeAvailability(),
    reviews: baseReviews,
  },
]

export function findContractor(id: string) {
  return contractors.find((c) => c.id === id)
}
