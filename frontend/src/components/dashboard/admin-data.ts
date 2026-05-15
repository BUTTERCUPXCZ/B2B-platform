export type AdminDisputeStatus =
  | "open"
  | "awaiting_evidence"
  | "ruled_refund"
  | "ruled_release"
  | "ruled_split"
  | "closed"

export type AdminDisputeKind = "material_order" | "project_milestone" | "service_booking"

export type AdminDisputeTimelineEvent = {
  date: string
  actor: string
  text: string
}

export type AdminDispute = {
  id: string
  ref: string
  kind: AdminDisputeKind
  buyer: string
  otherParty: string
  amount: number
  openedOn: string
  sloDeadline: string
  status: AdminDisputeStatus
  summary: string
  timeline: AdminDisputeTimelineEvent[]
}

export const adminDisputes: AdminDispute[] = [
  {
    id: "DSP-2026-014",
    ref: "KSK-00012238",
    kind: "material_order",
    buyer: "Joaquin P.",
    otherParty: "Steelhouse Pasig",
    amount: 31_200,
    openedOn: "2026-05-06",
    sloDeadline: "2026-05-09",
    status: "open",
    summary: "Buyer reports rebar bundles short by 4 bars vs spec. Photo evidence on file.",
    timeline: [
      { date: "2026-05-06 14:21", actor: "Joaquin P.", text: "Opened dispute. Uploaded 3 photos showing bundle count." },
      { date: "2026-05-07 09:02", actor: "Steelhouse Pasig", text: "Responded — proposing partial refund." },
    ],
  },
  {
    id: "DSP-2026-013",
    ref: "PRJ-2026-002 / m-3",
    kind: "project_milestone",
    buyer: "Marlon R.",
    otherParty: "Stormshield Roofing",
    amount: 71_250,
    openedOn: "2026-05-05",
    sloDeadline: "2026-05-08",
    status: "awaiting_evidence",
    summary: "Client disputes Steel install milestone — gutter pitch off-spec, water pooling at rear roof line.",
    timeline: [
      { date: "2026-05-05 16:40", actor: "Marlon R.", text: "Disputed milestone 3. Requested rework before approval." },
      { date: "2026-05-06 11:18", actor: "Reviewer", text: "Asked contractor for site photos and measurements." },
    ],
  },
  {
    id: "DSP-2026-011",
    ref: "BK-9006",
    kind: "service_booking",
    buyer: "Joaquin P.",
    otherParty: "Studio Manille",
    amount: 8_500,
    openedOn: "2026-05-02",
    sloDeadline: "2026-05-05",
    status: "ruled_split",
    summary: "Color consult delivered late by 3 days. Buyer requested 50% refund — split agreed.",
    timeline: [
      { date: "2026-05-02 10:00", actor: "Joaquin P.", text: "Opened — late delivery." },
      { date: "2026-05-04 13:45", actor: "Reviewer", text: "Ruled 50/50 split — partial refund processed." },
    ],
  },
  {
    id: "DSP-2026-008",
    ref: "KSK-00011982",
    kind: "material_order",
    buyer: "Aileen R.",
    otherParty: "ProCoat Supply",
    amount: 17_500,
    openedOn: "2026-04-22",
    sloDeadline: "2026-04-25",
    status: "closed",
    summary: "Wrong paint color shipped — replacement sent, original refunded.",
    timeline: [
      { date: "2026-04-22 09:30", actor: "Aileen R.", text: "Wrong color shipped." },
      { date: "2026-04-23 16:00", actor: "Reviewer", text: "Refund issued. Replacement scheduled." },
    ],
  },
  {
    id: "DSP-2026-005",
    ref: "PRJ-2026-001 / m-2",
    kind: "project_milestone",
    buyer: "Elena M.",
    otherParty: "Studio Manille",
    amount: 295_000,
    openedOn: "2026-04-19",
    sloDeadline: "2026-04-22",
    status: "ruled_release",
    summary: "Client raised concern on rough-in finish quality. Inspector confirmed compliance — escrow released.",
    timeline: [
      { date: "2026-04-19", actor: "Elena M.", text: "Opened — quality concern." },
      { date: "2026-04-21", actor: "Inspector", text: "Site visit confirmed compliance." },
      { date: "2026-04-22", actor: "Reviewer", text: "Ruled release. Escrow released to contractor." },
    ],
  },
]

export type AdminKpiSnapshot = {
  label: string
  value: string
  delta: string
  trendUp: boolean
  hint: string
}

export const adminKpiSnapshots: AdminKpiSnapshot[] = [
  { label: "GMV (30d)", value: "₱48.2M", delta: "+11.4%", trendUp: true, hint: "Materials + services + projects" },
  { label: "Take rate", value: "8.6%", delta: "+0.3pp", trendUp: true, hint: "Blended platform commission" },
  { label: "Active sellers", value: "164", delta: "+12", trendUp: true, hint: "At least one sale in last 30d" },
  { label: "Active contractors", value: "412", delta: "+38", trendUp: true, hint: "Bid or working in last 30d" },
  { label: "Disputes opened (30d)", value: "9", delta: "+2", trendUp: false, hint: "Across all categories" },
  { label: "Disputes resolved (30d)", value: "11", delta: "Within 3-day SLO", trendUp: true, hint: "Including 1 split, 2 refund, 8 release" },
  { label: "Avg payout time", value: "0d", delta: "Direct to bank", trendUp: true, hint: "Sellers + companies skip platform balance" },
  { label: "Avg milestone release", value: "11h", delta: "Faster vs target", trendUp: true, hint: "Time from approval to release" },
]

export type AdminTopPerformer = {
  id: string
  name: string
  segment: "seller" | "contractor"
  metric: number
  metricLabel: string
}

export const adminTopPerformers: AdminTopPerformer[] = [
  { id: "eagle-materials", name: "Eagle Materials", segment: "seller", metric: 1_240_400, metricLabel: "GMV (30d)" },
  { id: "mosaic-yard-co", name: "Mosaic Yard Co.", segment: "seller", metric: 894_200, metricLabel: "GMV (30d)" },
  { id: "procoat-supply", name: "ProCoat Supply", segment: "seller", metric: 612_900, metricLabel: "GMV (30d)" },
  { id: "studio-manille", name: "Studio Manille", segment: "contractor", metric: 1_062_000, metricLabel: "Earnings released" },
  { id: "stormshield-roofing", name: "Stormshield Roofing", segment: "contractor", metric: 472_000, metricLabel: "Earnings released" },
  { id: "aquaflow-plumbing", name: "AquaFlow Plumbing", segment: "contractor", metric: 318_400, metricLabel: "Earnings released" },
]

export type AdminVerificationDocKind = "Identity" | "License" | "Portfolio" | "Top Rated"

export type AdminVerificationApplicantKind = "contractor" | "seller" | "company"

export type AdminVerificationDocument = {
  id: string
  label: string
  thumb: string
}

export type AdminVerificationItem = {
  id: string
  applicant: string
  applicantKind: AdminVerificationApplicantKind
  type: AdminVerificationDocKind
  submittedOn: string
  reviewer: string
  status: "pending" | "approved" | "rejected" | "needs_info"
  documents: AdminVerificationDocument[]
}

const docPlaceholder = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80&auto=format&fit=crop"

export const adminVerifications: AdminVerificationItem[] = [
  {
    id: "VRF-2014",
    applicant: "Stormshield Roofing",
    applicantKind: "contractor",
    type: "Top Rated",
    submittedOn: "2026-05-06",
    reviewer: "Reviewer A",
    status: "pending",
    documents: [
      { id: "doc-1", label: "Recent project photos", thumb: docPlaceholder },
      { id: "doc-2", label: "Client testimonials PDF", thumb: docPlaceholder },
    ],
  },
  {
    id: "VRF-2013",
    applicant: "Greenroot Landscaping",
    applicantKind: "contractor",
    type: "Identity",
    submittedOn: "2026-05-05",
    reviewer: "Reviewer B",
    status: "pending",
    documents: [
      { id: "doc-1", label: "Government ID front", thumb: docPlaceholder },
      { id: "doc-2", label: "Government ID back", thumb: docPlaceholder },
      { id: "doc-3", label: "Selfie holding ID", thumb: docPlaceholder },
    ],
  },
  {
    id: "VRF-2012",
    applicant: "Sparkline Electric",
    applicantKind: "contractor",
    type: "Portfolio",
    submittedOn: "2026-05-04",
    reviewer: "Reviewer A",
    status: "needs_info",
    documents: [
      { id: "doc-1", label: "Wiring panel photo", thumb: docPlaceholder },
      { id: "doc-2", label: "Job log spreadsheet", thumb: docPlaceholder },
    ],
  },
  {
    id: "VRF-2011",
    applicant: "Eagle Materials",
    applicantKind: "seller",
    type: "License",
    submittedOn: "2026-05-03",
    reviewer: "Reviewer C",
    status: "approved",
    documents: [
      { id: "doc-1", label: "BIR Form 2303", thumb: docPlaceholder },
      { id: "doc-2", label: "Mayor's permit 2026", thumb: docPlaceholder },
    ],
  },
  {
    id: "VRF-2009",
    applicant: "Studio Manille",
    applicantKind: "company",
    type: "License",
    submittedOn: "2026-05-01",
    reviewer: "Reviewer B",
    status: "rejected",
    documents: [
      { id: "doc-1", label: "PCAB license (expired)", thumb: docPlaceholder },
    ],
  },
]

export type AdminActivityItem = {
  id: string
  ts: string
  kind: "signup" | "dispute" | "kyc" | "release"
  text: string
}

export const adminActivity: AdminActivityItem[] = [
  { id: "ACT-1", ts: "2026-05-08 09:14", kind: "signup", text: "New seller signed up — Brick Lane Materials (NCR)" },
  { id: "ACT-2", ts: "2026-05-08 08:31", kind: "dispute", text: "DSP-2026-014 escalated — buyer requested human review" },
  { id: "ACT-3", ts: "2026-05-07 21:02", kind: "kyc", text: "VRF-2014 submitted — Stormshield Top-Rated review" },
  { id: "ACT-4", ts: "2026-05-07 17:48", kind: "release", text: "PRJ-2026-001 milestone 2 released — ₱295,000 to Studio Manille" },
  { id: "ACT-5", ts: "2026-05-07 14:11", kind: "signup", text: "New contractor — Northshore Concrete (Cebu)" },
]

export type AdminSettings = {
  profile: {
    name: string
    role: "Platform Admin"
    email: string
  }
  notifications: {
    disputeOpened: boolean
    kycSubmitted: boolean
    payoutProcessed: boolean
    systemAlert: boolean
  }
  security: {
    email: string
    mfa: "required"
    lastLogin: string
  }
}

export const adminSettings: AdminSettings = {
  profile: {
    name: "Pia Reyes",
    role: "Platform Admin",
    email: "admin@struktura.ph",
  },
  notifications: {
    disputeOpened: true,
    kycSubmitted: true,
    payoutProcessed: false,
    systemAlert: true,
  },
  security: {
    email: "admin@struktura.ph",
    mfa: "required",
    lastLogin: "2026-05-08 09:01 (Manila)",
  },
}
