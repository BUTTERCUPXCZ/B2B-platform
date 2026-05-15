export type BidMilestone = {
  title: string
  pct: number
}

export type Bid = {
  id: string
  jobId: string
  contractorId: string
  contractorName: string
  contractorAvatar: string
  contractorRating: number
  contractorReviews: number
  contractorBadge: "license" | "portfolio" | "top-rated" | "identity"
  amount: number
  timelineDays: number
  milestones: BidMilestone[]
  coverMessage: string
  submittedAgo: string
}

export const bids: Bid[] = [
  {
    id: "bid-001",
    jobId: "j-001",
    contractorId: "stormshield-roofing",
    contractorName: "Stormshield Roofing",
    contractorAvatar:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=200&q=80&auto=format&fit=crop",
    contractorRating: 4.7,
    contractorReviews: 412,
    contractorBadge: "license",
    amount: 285_000,
    timelineDays: 14,
    milestones: [
      { title: "Tear-off + scaffold", pct: 30 },
      { title: "Frame + underlayment", pct: 35 },
      { title: "Steel install + gutters", pct: 25 },
      { title: "Cleanup + final walk", pct: 10 },
    ],
    coverMessage:
      "We've done 80+ re-roof jobs in QC this year. Crew of 6 can deliver in 12–14 days, weather permitting.",
    submittedAgo: "1h ago",
  },
  {
    id: "bid-002",
    jobId: "j-001",
    contractorId: "metroshield-pro",
    contractorName: "Metroshield Pro",
    contractorAvatar:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&q=80&auto=format&fit=crop",
    contractorRating: 4.5,
    contractorReviews: 188,
    contractorBadge: "portfolio",
    amount: 245_000,
    timelineDays: 18,
    milestones: [
      { title: "Tear-off", pct: 25 },
      { title: "Install + gutters", pct: 60 },
      { title: "Punch list", pct: 15 },
    ],
    coverMessage: "Standard colored steel + new gutters. We can start next Monday.",
    submittedAgo: "3h ago",
  },
  {
    id: "bid-003",
    jobId: "j-001",
    contractorId: "skyline-roof-co",
    contractorName: "Skyline Roof Co.",
    contractorAvatar:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=80&auto=format&fit=crop",
    contractorRating: 4.9,
    contractorReviews: 96,
    contractorBadge: "top-rated",
    amount: 318_000,
    timelineDays: 12,
    milestones: [
      { title: "Tear-off + waterproof", pct: 35 },
      { title: "Steel install", pct: 40 },
      { title: "Gutters + downspouts", pct: 15 },
      { title: "Cleanup", pct: 10 },
    ],
    coverMessage:
      "Premium-tier crew. 5-year workmanship warranty. Daily progress photos shared in chat.",
    submittedAgo: "30m ago",
  },
  {
    id: "bid-004",
    jobId: "j-002",
    contractorId: "studio-manille",
    contractorName: "Studio Manille",
    contractorAvatar:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=200&q=80&auto=format&fit=crop",
    contractorRating: 4.8,
    contractorReviews: 316,
    contractorBadge: "license",
    amount: 1_180_000,
    timelineDays: 35,
    milestones: [
      { title: "Demolition + dump", pct: 15 },
      { title: "Plumbing + electrical rough-in", pct: 25 },
      { title: "Cabinetry + counters", pct: 35 },
      { title: "Tile + finishes", pct: 20 },
      { title: "Final QA", pct: 5 },
    ],
    coverMessage:
      "Site visit available this week. Cabinet samples + 3D mockup included in quote.",
    submittedAgo: "2h ago",
  },
  {
    id: "bid-005",
    jobId: "j-003",
    contractorId: "aquaflow-plumbing",
    contractorName: "AquaFlow Plumbing",
    contractorAvatar:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&q=80&auto=format&fit=crop",
    contractorRating: 4.8,
    contractorReviews: 528,
    contractorBadge: "license",
    amount: 48_000,
    timelineDays: 4,
    milestones: [
      { title: "Leak source diagnosis", pct: 25 },
      { title: "Repair + waterproof", pct: 50 },
      { title: "Retile + grout", pct: 25 },
    ],
    coverMessage: "Same-day diagnosis available. Licensed master plumber on every job.",
    submittedAgo: "1d ago",
  },
]

export function bidsForJob(jobId: string) {
  return bids.filter((b) => b.jobId === jobId)
}
