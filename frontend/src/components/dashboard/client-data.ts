export type ClientOrderStatus =
  | "awaiting_payment"
  | "paid"
  | "shipped"
  | "delivered"
  | "disputed"

export type ClientMaterialOrder = {
  id: string
  date: string
  seller: string
  items: number
  total: number
  status: ClientOrderStatus
  destination: string
  trackingRef?: string
  deliveredOn?: string
  confirmed?: boolean
}

export const clientOrders: ClientMaterialOrder[] = [
  {
    id: "KSK-00012420",
    date: "2026-04-29",
    seller: "Eagle Materials",
    items: 7,
    total: 42_180,
    status: "awaiting_payment",
    destination: "Quezon City",
  },
  {
    id: "KSK-00012412",
    date: "2026-04-28",
    seller: "Mosaic Yard Co.",
    items: 5,
    total: 27_900,
    status: "paid",
    destination: "Mandaluyong",
  },
  {
    id: "KSK-00012398",
    date: "2026-04-26",
    seller: "Eagle Materials",
    items: 2,
    total: 6_290,
    status: "shipped",
    destination: "Makati",
    trackingRef: "JNT-PH-44210981",
  },
  {
    id: "KSK-00012345",
    date: "2026-04-22",
    seller: "ProCoat Supply",
    items: 4,
    total: 18_540,
    status: "delivered",
    destination: "Caloocan",
    deliveredOn: "2026-04-26",
    confirmed: false,
  },
  {
    id: "KSK-00012301",
    date: "2026-04-19",
    seller: "BoltWorks Hardware",
    items: 1,
    total: 3_499,
    status: "delivered",
    destination: "Mandaluyong",
    deliveredOn: "2026-04-22",
    confirmed: true,
  },
  {
    id: "KSK-00012254",
    date: "2026-04-15",
    seller: "Eagle Materials",
    items: 12,
    total: 65_400,
    status: "delivered",
    destination: "Tagaytay",
    deliveredOn: "2026-04-19",
    confirmed: true,
  },
  {
    id: "KSK-00012238",
    date: "2026-04-13",
    seller: "Steelhouse Pasig",
    items: 6,
    total: 31_200,
    status: "disputed",
    destination: "Las Piñas",
  },
]

export type ClientJobStatus = "open" | "bidding" | "hired" | "completed"

export type ClientJobOverview = {
  jobId: string
  status: ClientJobStatus
  newBidsSinceLastView: number
  hiredContractor?: string
  awardedAmount?: number
}

export const clientJobsOverview: ClientJobOverview[] = [
  { jobId: "j-001", status: "hired", newBidsSinceLastView: 0, hiredContractor: "Stormshield Roofing", awardedAmount: 285_000 },
  { jobId: "j-002", status: "hired", newBidsSinceLastView: 0, hiredContractor: "Studio Manille", awardedAmount: 1_180_000 },
  { jobId: "j-003", status: "completed", newBidsSinceLastView: 0, hiredContractor: "AquaFlow Plumbing", awardedAmount: 48_000 },
  { jobId: "j-005", status: "bidding", newBidsSinceLastView: 2 },
  { jobId: "j-007", status: "open", newBidsSinceLastView: 0 },
  { jobId: "j-008", status: "bidding", newBidsSinceLastView: 4 },
]

export type ClientEstimateStatus = "pending" | "ready" | "expired"

export type ClientEstimateOverview = {
  estimateId: string
  status: ClientEstimateStatus
  paidAmount: number
  turnaroundDays: number
}

export const clientEstimatesOverview: ClientEstimateOverview[] = [
  { estimateId: "EST-2026-001", status: "ready", paidAmount: 1_500, turnaroundDays: 3 },
  { estimateId: "EST-2026-002", status: "ready", paidAmount: 2_000, turnaroundDays: 4 },
  { estimateId: "EST-2026-003", status: "pending", paidAmount: 1_500, turnaroundDays: 0 },
]

export type ClientSettings = {
  profile: {
    name: string
    email: string
    phone: string
    deliveryAddress: string
  }
  paymentMethods: { provider: string; label: string; last4: string; isDefault: boolean }[]
  notifications: {
    bidReceived: boolean
    milestoneApproved: boolean
    orderShipped: boolean
    estimateReady: boolean
    disputeUpdate: boolean
  }
  security: {
    email: string
    mfa: boolean
    lastLogin: string
  }
}

export const clientSettings: ClientSettings = {
  profile: {
    name: "Marlon Reyes",
    email: "marlon.r@example.ph",
    phone: "+63 917 555 0188",
    deliveryAddress: "12 Sampaguita St, Project 4, Quezon City, NCR",
  },
  paymentMethods: [
    { provider: "GCash", label: "GCash wallet", last4: "8821", isDefault: true },
    { provider: "BPI", label: "BPI savings", last4: "4019", isDefault: false },
    { provider: "Maya", label: "Maya wallet", last4: "6647", isDefault: false },
  ],
  notifications: {
    bidReceived: true,
    milestoneApproved: true,
    orderShipped: true,
    estimateReady: true,
    disputeUpdate: true,
  },
  security: {
    email: "marlon.r@example.ph",
    mfa: true,
    lastLogin: "2026-05-08 09:14 (Manila)",
  },
}
