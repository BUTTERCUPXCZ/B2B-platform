export type Order = {
  id: string
  date: string
  items: number
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
}

export const sampleOrders: Order[] = [
  { id: "KSK-00012345", date: "2026-04-22", items: 4, total: 18_540, status: "delivered" },
  { id: "KSK-00012398", date: "2026-04-26", items: 2, total: 6_290, status: "shipped" },
  { id: "KSK-00012420", date: "2026-04-29", items: 7, total: 42_180, status: "pending" },
]

export type Payout = {
  id: string
  date: string
  source: string
  amount: number
  status: "pending" | "paid"
}

export const sellerPayouts: Payout[] = [
  { id: "PYT-2010", date: "2026-04-15", source: "Bi-weekly cycle", amount: 84_200, status: "paid" },
  { id: "PYT-2011", date: "2026-04-29", source: "Bi-weekly cycle", amount: 102_640, status: "pending" },
]

export const contractorPayouts: Payout[] = [
  { id: "PRJPAY-201", date: "2026-04-19", source: "PRJ-2026-002 milestone 2", amount: 99_750, status: "paid" },
  { id: "PRJPAY-202", date: "2026-04-29", source: "PRJ-2026-001 milestone 3", amount: 413_000, status: "pending" },
]

export type Booking = {
  id: string
  customer: string
  service: string
  date: string
  status: "confirmed" | "pending" | "completed"
}

export const sampleBookings: Booking[] = [
  { id: "BK-9001", customer: "Elena M.", service: "Kitchen consult + 3D mockup", date: "2026-05-04", status: "confirmed" },
  { id: "BK-9002", customer: "Marlon R.", service: "Roofing site visit", date: "2026-05-06", status: "pending" },
  { id: "BK-9003", customer: "Renata C.", service: "Color consult + sampling", date: "2026-04-30", status: "completed" },
]

export type VerificationItem = {
  id: string
  contractorName: string
  type: "License" | "Identity" | "Portfolio"
  submittedAgo: string
  status: "pending" | "approved" | "rejected"
}

export const verificationQueue: VerificationItem[] = [
  { id: "VRF-1", contractorName: "Stormshield Roofing", type: "License", submittedAgo: "2h ago", status: "pending" },
  { id: "VRF-2", contractorName: "Sparkline Electric", type: "Portfolio", submittedAgo: "5h ago", status: "pending" },
  { id: "VRF-3", contractorName: "Greenroot Landscaping", type: "Identity", submittedAgo: "1d ago", status: "pending" },
  { id: "VRF-4", contractorName: "Metroshield Pro", type: "License", submittedAgo: "2d ago", status: "approved" },
]

export type SellerReview = {
  id: string
  productId: string
  buyerName: string
  buyerInitials: string
  rating: 1 | 2 | 3 | 4 | 5
  title: string
  body: string
  date: string
  verified: true
  reply?: { body: string; date: string }
}

export const sellerReviews: SellerReview[] = [
  {
    id: "RV-3041",
    productId: "cement-portland-40kg",
    buyerName: "Marlon R.",
    buyerInitials: "MR",
    rating: 5,
    title: "Strong cure, clean bags",
    body: "Used 60 bags on a slab pour. Bags were dry, no clumping, set time matched the spec sheet. Will reorder for the next phase.",
    date: "2026-04-29",
    verified: true,
    reply: {
      body: "Thanks Marlon — we hold cement in a climate-controlled bay, glad it shows. Reach out if you need bulk pricing on the next phase.",
      date: "2026-04-30",
    },
  },
  {
    id: "RV-3038",
    productId: "cement-portland-40kg",
    buyerName: "Elena M.",
    buyerInitials: "EM",
    rating: 4,
    title: "Solid cement, tight delivery window",
    body: "Quality is great. Delivery slot was a 4-hour window which made site planning tricky — would love a 2-hour window option.",
    date: "2026-04-26",
    verified: true,
  },
  {
    id: "RV-3032",
    productId: "tiles-porcelain-60x60",
    buyerName: "Daniel O.",
    buyerInitials: "DO",
    rating: 5,
    title: "Matte grey is exactly the spec",
    body: "Color matches the swatch we approved. Zero chipping out of 22 boxes. Installer happy with the rectified edges.",
    date: "2026-04-22",
    verified: true,
    reply: {
      body: "Appreciate the detail Daniel. We palletize porcelain on foam corners specifically to keep edges clean — glad it landed.",
      date: "2026-04-23",
    },
  },
  {
    id: "RV-3027",
    productId: "paint-latex-4l-eggshell",
    buyerName: "Renz B.",
    buyerInitials: "RB",
    rating: 5,
    title: "Excellent coverage on second coat",
    body: "Eggshell sheen is consistent and the second coat hid the underlying primer fully. Used 6 gallons across 3 rooms.",
    date: "2026-04-19",
    verified: true,
  },
  {
    id: "RV-3025",
    productId: "rebar-grade60-12mm",
    buyerName: "Aileen R.",
    buyerInitials: "AR",
    rating: 4,
    title: "Bundles arrived true to spec",
    body: "Grade 60 markings clear, lengths accurate. Two bars in one bundle had minor surface rust but cleaned up fine.",
    date: "2026-04-15",
    verified: true,
    reply: {
      body: "Surface oxidation on rebar is structurally fine but we'll flag the lot to the warehouse — thanks for the photo.",
      date: "2026-04-16",
    },
  },
  {
    id: "RV-3019",
    productId: "plywood-marine-18mm",
    buyerName: "Carlo D.",
    buyerInitials: "CD",
    rating: 3,
    title: "Decent boards, two had warp",
    body: "Out of 18 sheets, 2 had visible bow. Used them for non-structural anyway. Rest were clean and the marine grade held up under wet conditions.",
    date: "2026-04-12",
    verified: true,
  },
  {
    id: "RV-3014",
    productId: "drill-cordless-18v",
    buyerName: "Maria S.",
    buyerInitials: "MS",
    rating: 5,
    title: "Powerful for the price",
    body: "Two batteries lasted a full day on framing screws. Chuck holds tight. Came with a hard case which was a nice surprise.",
    date: "2026-04-08",
    verified: true,
  },
  {
    id: "RV-3010",
    productId: "pvc-pipe-3in",
    buyerName: "Ramon T.",
    buyerInitials: "RT",
    rating: 5,
    title: "Schedule 40 spec confirmed",
    body: "Wall thickness measured correct. Cuts cleanly, no brittleness on the bell ends. Pulled off a 30m run with zero rework.",
    date: "2026-04-04",
    verified: true,
  },
]

export type SalesPeriodLineItem = {
  orderId: string
  buyer: string
  gross: number
  commissionRate: number
  net: number
}

export type SalesPeriod = {
  id: string
  windowStart: string
  windowEnd: string
  orders: number
  gross: number
  commissionAvgRate: number
  commission: number
  netToBank: number
  bankMasked: string
  lineItems: SalesPeriodLineItem[]
}

export const sellerSalesPeriods: SalesPeriod[] = [
  {
    id: "SP-2026-09",
    windowStart: "2026-04-30",
    windowEnd: "2026-05-13",
    orders: 14,
    gross: 218_400,
    commissionAvgRate: 0.094,
    commission: 20_530,
    netToBank: 197_870,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00012420", buyer: "Marlon R.", gross: 42_180, commissionRate: 0.10, net: 37_962 },
      { orderId: "KSK-00012398", buyer: "Elena M.", gross: 6_290, commissionRate: 0.075, net: 5_818 },
      { orderId: "KSK-00012386", buyer: "Daniel O.", gross: 18_540, commissionRate: 0.10, net: 16_686 },
    ],
  },
  {
    id: "SP-2026-08",
    windowStart: "2026-04-16",
    windowEnd: "2026-04-29",
    orders: 22,
    gross: 412_900,
    commissionAvgRate: 0.092,
    commission: 38_000,
    netToBank: 374_900,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00012345", buyer: "Renz B.", gross: 18_540, commissionRate: 0.10, net: 16_686 },
      { orderId: "KSK-00012301", buyer: "Aileen R.", gross: 3_499, commissionRate: 0.05, net: 3_324 },
      { orderId: "KSK-00012254", buyer: "Carlo D.", gross: 65_400, commissionRate: 0.125, net: 57_225 },
    ],
  },
  {
    id: "SP-2026-07",
    windowStart: "2026-04-02",
    windowEnd: "2026-04-15",
    orders: 19,
    gross: 348_120,
    commissionAvgRate: 0.087,
    commission: 30_287,
    netToBank: 317_833,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00012180", buyer: "Maria S.", gross: 9_290, commissionRate: 0.075, net: 8_593 },
      { orderId: "KSK-00012144", buyer: "Ramon T.", gross: 24_500, commissionRate: 0.10, net: 22_050 },
    ],
  },
  {
    id: "SP-2026-06",
    windowStart: "2026-03-19",
    windowEnd: "2026-04-01",
    orders: 17,
    gross: 290_640,
    commissionAvgRate: 0.078,
    commission: 22_670,
    netToBank: 267_970,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00011982", buyer: "Joaquin P.", gross: 41_200, commissionRate: 0.10, net: 37_080 },
    ],
  },
  {
    id: "SP-2026-05",
    windowStart: "2026-03-05",
    windowEnd: "2026-03-18",
    orders: 11,
    gross: 184_400,
    commissionAvgRate: 0.072,
    commission: 13_276,
    netToBank: 171_124,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00011820", buyer: "Selena C.", gross: 12_450, commissionRate: 0.075, net: 11_516 },
    ],
  },
  {
    id: "SP-2026-04",
    windowStart: "2026-02-19",
    windowEnd: "2026-03-04",
    orders: 9,
    gross: 142_900,
    commissionAvgRate: 0.069,
    commission: 9_860,
    netToBank: 133_040,
    bankMasked: "BPI ••••4231",
    lineItems: [
      { orderId: "KSK-00011714", buyer: "Diego F.", gross: 28_900, commissionRate: 0.075, net: 26_733 },
    ],
  },
]

export type SellerSettings = {
  store: {
    name: string
    slug: string
    tagline: string
    supportEmail: string
    supportPhone: string
  }
  bank: {
    provider: string
    accountName: string
    last4: string
  }
  shipping: {
    pickupAddress: string
    leadTimeDays: number
    couriers: string[]
  }
  categories: string[]
  notifications: {
    newOrder: boolean
    dispute: boolean
    review: boolean
    deposit: boolean
    lowStock: boolean
  }
  security: {
    email: string
    mfa: boolean
    lastLogin: string
  }
}

export const sellerSettings: SellerSettings = {
  store: {
    name: "Eagle Materials",
    slug: "eagle-materials",
    tagline: "Bulk cement, rebar, and finish materials — Pasig & Quezon City.",
    supportEmail: "ops@eagle-materials.ph",
    supportPhone: "+63 917 555 0142",
  },
  bank: {
    provider: "BPI",
    accountName: "Eagle Materials Trading Corp.",
    last4: "4231",
  },
  shipping: {
    pickupAddress: "Warehouse 4, Eagle Industrial Park, Ortigas Ave Ext, Pasig City",
    leadTimeDays: 2,
    couriers: ["J&T Express", "LBC", "NinjaVan"],
  },
  categories: [
    "Cement & Concrete",
    "Steel & Rebar",
    "Tiles & Flooring",
    "Paint & Finishes",
  ],
  notifications: {
    newOrder: true,
    dispute: true,
    review: true,
    deposit: true,
    lowStock: true,
  },
  security: {
    email: "ops@eagle-materials.ph",
    mfa: true,
    lastLogin: "2026-05-06 14:22 (Manila)",
  },
}
