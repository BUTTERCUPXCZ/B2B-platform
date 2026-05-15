export type ContractorBidStatus = "pending" | "won" | "lost" | "withdrawn"

export type ContractorBidEntry = {
  id: string
  jobId: string
  status: ContractorBidStatus
  submittedDate: string
  decidedDate?: string
  clientName: string
  amount: number
  timelineDays: number
  milestoneCount: number
}

export const contractorBids: ContractorBidEntry[] = [
  { id: "bid-001", jobId: "j-001", status: "won", submittedDate: "2026-04-15", decidedDate: "2026-04-15", clientName: "Marlon R.", amount: 285_000, timelineDays: 14, milestoneCount: 4 },
  { id: "bid-007", jobId: "j-005", status: "pending", submittedDate: "2026-05-04", clientName: "Renata C.", amount: 245_000, timelineDays: 12, milestoneCount: 3 },
  { id: "bid-008", jobId: "j-008", status: "pending", submittedDate: "2026-05-05", clientName: "Jonas P.", amount: 18_500, timelineDays: 1, milestoneCount: 2 },
  { id: "bid-009", jobId: "j-007", status: "pending", submittedDate: "2026-05-06", clientName: "Priya H.", amount: 312_000, timelineDays: 28, milestoneCount: 4 },
  { id: "bid-010", jobId: "j-006", status: "lost", submittedDate: "2026-04-30", decidedDate: "2026-05-02", clientName: "Adi S.", amount: 78_500, timelineDays: 5, milestoneCount: 2 },
  { id: "bid-011", jobId: "j-009", status: "lost", submittedDate: "2026-04-22", decidedDate: "2026-04-28", clientName: "Cara L.", amount: 2_280_000, timelineDays: 110, milestoneCount: 6 },
  { id: "bid-012", jobId: "j-004", status: "withdrawn", submittedDate: "2026-04-18", decidedDate: "2026-04-19", clientName: "Marisol T.", amount: 4_500_000, timelineDays: 180, milestoneCount: 6 },
]

export type EarningEntryStatus = "held" | "released" | "disputed"

export type ContractorEarningEntry = {
  id: string
  projectId: string
  projectTitle: string
  milestoneTitle: string
  amount: number
  status: EarningEntryStatus
  submittedAt?: string
  releasedAt?: string
  bankMasked: string
  note?: string
}

export const contractorEarnings: ContractorEarningEntry[] = [
  {
    id: "EARN-3014",
    projectId: "PRJ-2026-002",
    projectTitle: "Re-roof 120 sqm two-storey home",
    milestoneTitle: "Tear-off + scaffold",
    amount: 85_500,
    status: "released",
    submittedAt: "2026-04-19",
    releasedAt: "2026-04-19",
    bankMasked: "BPI ••••8821",
  },
  {
    id: "EARN-3015",
    projectId: "PRJ-2026-002",
    projectTitle: "Re-roof 120 sqm two-storey home",
    milestoneTitle: "Frame + underlayment",
    amount: 99_750,
    status: "released",
    submittedAt: "2026-04-23",
    releasedAt: "2026-04-24",
    bankMasked: "BPI ••••8821",
  },
  {
    id: "EARN-3018",
    projectId: "PRJ-2026-002",
    projectTitle: "Re-roof 120 sqm two-storey home",
    milestoneTitle: "Steel install + gutters",
    amount: 71_250,
    status: "held",
    submittedAt: "2026-04-28",
    bankMasked: "BPI ••••8821",
    note: "Awaiting client approval — submitted 2026-04-28",
  },
  {
    id: "EARN-3019",
    projectId: "PRJ-2026-002",
    projectTitle: "Re-roof 120 sqm two-storey home",
    milestoneTitle: "Cleanup + final walk",
    amount: 28_500,
    status: "held",
    bankMasked: "BPI ••••8821",
    note: "Milestone not yet started",
  },
]

export type ContractorVerificationLadder = {
  identity: "approved" | "pending" | "missing"
  license: "approved" | "pending" | "missing"
  portfolio: "approved" | "pending" | "missing"
  topRated: "approved" | "pending" | "missing"
}

export type ContractorSettings = {
  profile: {
    displayName: string
    trades: string[]
    licenseNumber: string
    bio: string
    headshotUrl: string
  }
  bank: {
    provider: string
    accountName: string
    last4: string
  }
  coverage: string[]
  verification: ContractorVerificationLadder
  notifications: {
    newJobMatch: boolean
    bidWon: boolean
    bidLost: boolean
    milestoneApproved: boolean
    disputeOpened: boolean
  }
  security: {
    email: string
    mfa: boolean
    lastLogin: string
  }
}

export const contractorSettings: ContractorSettings = {
  profile: {
    displayName: "Stormshield Roofing",
    trades: ["Roofing", "Repairs & Handyman"],
    licenseNumber: "PCAB-CGC-44218",
    bio:
      "QC-based licensed roofing crew. 80+ re-roof jobs in 2025. 5-year workmanship warranty on every install.",
    headshotUrl:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=300&q=80&auto=format&fit=crop",
  },
  bank: {
    provider: "BPI",
    accountName: "Stormshield Roofing Corp.",
    last4: "8821",
  },
  coverage: ["Metro Manila", "Bulacan", "Rizal"],
  verification: {
    identity: "approved",
    license: "approved",
    portfolio: "approved",
    topRated: "pending",
  },
  notifications: {
    newJobMatch: true,
    bidWon: true,
    bidLost: false,
    milestoneApproved: true,
    disputeOpened: true,
  },
  security: {
    email: "ops@stormshield.ph",
    mfa: true,
    lastLogin: "2026-05-08 07:45 (Manila)",
  },
}
