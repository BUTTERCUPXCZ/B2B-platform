export type CompanyServiceStatus = "live" | "paused" | "draft"
export type CompanyPricingModel = "fixed" | "hourly" | "quote"

export type CompanyServiceListing = {
  id: string
  name: string
  category: string
  pricingModel: CompanyPricingModel
  startingPrice: number
  coverage: string
  bookings30d: number
  rating: number
  reviewCount: number
  status: CompanyServiceStatus
  updated: string
}

export const companyServices: CompanyServiceListing[] = [
  {
    id: "svc-001",
    name: "Kitchen renovation — full remodel",
    category: "Renovation",
    pricingModel: "quote",
    startingPrice: 450_000,
    coverage: "NCR",
    bookings30d: 4,
    rating: 4.9,
    reviewCount: 218,
    status: "live",
    updated: "1d ago",
  },
  {
    id: "svc-002",
    name: "Bathroom retiling + waterproofing",
    category: "Renovation",
    pricingModel: "fixed",
    startingPrice: 95_000,
    coverage: "NCR",
    bookings30d: 7,
    rating: 4.8,
    reviewCount: 132,
    status: "live",
    updated: "3d ago",
  },
  {
    id: "svc-003",
    name: "Color consult + 3D mockup",
    category: "Painting",
    pricingModel: "fixed",
    startingPrice: 8_500,
    coverage: "NCR + Cavite",
    bookings30d: 12,
    rating: 4.9,
    reviewCount: 86,
    status: "live",
    updated: "5h ago",
  },
  {
    id: "svc-004",
    name: "Hourly site supervision (PM)",
    category: "Project Management",
    pricingModel: "hourly",
    startingPrice: 1_400,
    coverage: "Metro Manila",
    bookings30d: 18,
    rating: 4.7,
    reviewCount: 64,
    status: "live",
    updated: "2d ago",
  },
  {
    id: "svc-005",
    name: "Whole-home electrical safety check",
    category: "Electrical",
    pricingModel: "fixed",
    startingPrice: 6_500,
    coverage: "NCR",
    bookings30d: 3,
    rating: 4.6,
    reviewCount: 41,
    status: "paused",
    updated: "2w ago",
  },
  {
    id: "svc-006",
    name: "Cabinet shop drawings package",
    category: "Renovation",
    pricingModel: "quote",
    startingPrice: 35_000,
    coverage: "Nationwide",
    bookings30d: 0,
    rating: 0,
    reviewCount: 0,
    status: "draft",
    updated: "Just now",
  },
]

export type CompanyBookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"

export type CompanyBookingEntry = {
  id: string
  serviceId: string
  serviceName: string
  customer: string
  scheduled: string
  location: string
  total: number
  status: CompanyBookingStatus
  createdAt: string
}

export const companyBookings: CompanyBookingEntry[] = [
  { id: "BK-9018", serviceId: "svc-003", serviceName: "Color consult + 3D mockup", customer: "Renata C.", scheduled: "2026-05-12 10:00", location: "Taguig", total: 8_500, status: "pending", createdAt: "2026-05-07" },
  { id: "BK-9017", serviceId: "svc-002", serviceName: "Bathroom retiling + waterproofing", customer: "Daniel O.", scheduled: "2026-05-15", location: "Pasig", total: 95_000, status: "pending", createdAt: "2026-05-07" },
  { id: "BK-9015", serviceId: "svc-001", serviceName: "Kitchen renovation — full remodel", customer: "Elena M.", scheduled: "2026-05-20", location: "Makati", total: 1_180_000, status: "confirmed", createdAt: "2026-05-04" },
  { id: "BK-9012", serviceId: "svc-004", serviceName: "Hourly site supervision (PM)", customer: "Marlon R.", scheduled: "2026-05-08 07:00", location: "Quezon City", total: 11_200, status: "in_progress", createdAt: "2026-05-02" },
  { id: "BK-9008", serviceId: "svc-002", serviceName: "Bathroom retiling + waterproofing", customer: "Aileen R.", scheduled: "2026-04-26", location: "Mandaluyong", total: 95_000, status: "completed", createdAt: "2026-04-19" },
  { id: "BK-9006", serviceId: "svc-003", serviceName: "Color consult + 3D mockup", customer: "Joaquin P.", scheduled: "2026-04-24", location: "Las Piñas", total: 8_500, status: "completed", createdAt: "2026-04-18" },
  { id: "BK-9003", serviceId: "svc-004", serviceName: "Hourly site supervision (PM)", customer: "Selena C.", scheduled: "2026-04-15", location: "Mandaluyong", total: 8_400, status: "cancelled", createdAt: "2026-04-10" },
]

export type CompanySalesPeriod = {
  id: string
  windowStart: string
  windowEnd: string
  bookings: number
  gross: number
  commissionAvgRate: number
  commission: number
  netToBank: number
  bankMasked: string
  lineItems: { bookingId: string; customer: string; gross: number; commissionRate: number; net: number }[]
}

export const companySalesPeriods: CompanySalesPeriod[] = [
  {
    id: "CSP-2026-09",
    windowStart: "2026-04-30",
    windowEnd: "2026-05-13",
    bookings: 9,
    gross: 318_400,
    commissionAvgRate: 0.10,
    commission: 31_840,
    netToBank: 286_560,
    bankMasked: "BPI ••••6612",
    lineItems: [
      { bookingId: "BK-9012", customer: "Marlon R.", gross: 11_200, commissionRate: 0.10, net: 10_080 },
      { bookingId: "BK-9015", customer: "Elena M.", gross: 1_180_000, commissionRate: 0.10, net: 1_062_000 },
    ],
  },
  {
    id: "CSP-2026-08",
    windowStart: "2026-04-16",
    windowEnd: "2026-04-29",
    bookings: 12,
    gross: 412_900,
    commissionAvgRate: 0.10,
    commission: 41_290,
    netToBank: 371_610,
    bankMasked: "BPI ••••6612",
    lineItems: [
      { bookingId: "BK-9008", customer: "Aileen R.", gross: 95_000, commissionRate: 0.10, net: 85_500 },
      { bookingId: "BK-9006", customer: "Joaquin P.", gross: 8_500, commissionRate: 0.10, net: 7_650 },
    ],
  },
  {
    id: "CSP-2026-07",
    windowStart: "2026-04-02",
    windowEnd: "2026-04-15",
    bookings: 8,
    gross: 281_500,
    commissionAvgRate: 0.095,
    commission: 26_742,
    netToBank: 254_758,
    bankMasked: "BPI ••••6612",
    lineItems: [
      { bookingId: "BK-8980", customer: "Selena C.", gross: 12_400, commissionRate: 0.10, net: 11_160 },
    ],
  },
  {
    id: "CSP-2026-06",
    windowStart: "2026-03-19",
    windowEnd: "2026-04-01",
    bookings: 11,
    gross: 388_140,
    commissionAvgRate: 0.10,
    commission: 38_814,
    netToBank: 349_326,
    bankMasked: "BPI ••••6612",
    lineItems: [
      { bookingId: "BK-8920", customer: "Carlo D.", gross: 95_000, commissionRate: 0.10, net: 85_500 },
    ],
  },
]

export type CompanyTeamMember = {
  id: string
  name: string
  role: string
  email: string
}

export type CompanySettings = {
  company: {
    name: string
    slug: string
    description: string
    website: string
    supportEmail: string
    supportPhone: string
  }
  bank: {
    provider: string
    accountName: string
    last4: string
  }
  coverage: string[]
  team: CompanyTeamMember[]
  notifications: {
    newBooking: boolean
    bookingCancelled: boolean
    review: boolean
    deposit: boolean
  }
  security: {
    email: string
    mfa: boolean
    lastLogin: string
  }
}

export const companySettings: CompanySettings = {
  company: {
    name: "Studio Manille",
    slug: "studio-manille",
    description:
      "Renovation studio focused on kitchens, baths, and full-home remodels. On-site PM and weekly client updates.",
    website: "https://studiomanille.ph",
    supportEmail: "studio@manille.ph",
    supportPhone: "+63 917 555 0210",
  },
  bank: {
    provider: "BPI",
    accountName: "Studio Manille Inc.",
    last4: "6612",
  },
  coverage: ["NCR", "Cavite", "Laguna"],
  team: [
    { id: "tm-1", name: "Ana Lim", role: "Principal designer", email: "ana@manille.ph" },
    { id: "tm-2", name: "Rico Bayani", role: "Site PM", email: "rico@manille.ph" },
    { id: "tm-3", name: "Jenna Cruz", role: "Customer success", email: "jenna@manille.ph" },
  ],
  notifications: {
    newBooking: true,
    bookingCancelled: true,
    review: true,
    deposit: true,
  },
  security: {
    email: "studio@manille.ph",
    mfa: true,
    lastLogin: "2026-05-07 18:02 (Manila)",
  },
}
