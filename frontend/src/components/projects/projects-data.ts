export type MilestoneStatus =
  | "pending"
  | "in-progress"
  | "submitted"
  | "approved"
  | "disputed"

export type Milestone = {
  id: string
  title: string
  pct: number
  amount: number
  status: MilestoneStatus
  dueDate: string
  approvedDate?: string
}

export type LedgerType = "hold" | "release" | "refund" | "compensation"

export type LedgerEntry = {
  date: string
  type: LedgerType
  amount: number
  note: string
}

export type ProjectStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Project = {
  id: string
  jobId: string
  clientId: string
  clientName: string
  contractorId: string
  contractorName: string
  contractorAvatar: string
  title: string
  category: string
  location: string
  stage: ProjectStage
  contractValue: number
  startDate: string
  endDate: string
  graceDays: number
  daysRemaining: number
  milestones: Milestone[]
  escrow: { held: number; released: number; pending: number; refunded: number }
  ledger: LedgerEntry[]
}

export const stageLabels: Record<ProjectStage, string> = {
  1: "Posted",
  2: "Bidding",
  3: "Awarded",
  4: "Contract signed",
  5: "Active — in progress",
  6: "Milestone reviews",
  7: "Completion",
  8: "Review & archived",
}

export const projects: Project[] = [
  {
    id: "PRJ-2026-001",
    jobId: "j-002",
    clientId: "elena-m",
    clientName: "Elena M.",
    contractorId: "studio-manille",
    contractorName: "Studio Manille",
    contractorAvatar:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=300&q=80&auto=format&fit=crop",
    title: "Kitchen renovation — full remodel",
    category: "Renovation",
    location: "Makati",
    stage: 5,
    contractValue: 1_180_000,
    startDate: "2026-04-01",
    endDate: "2026-05-15",
    graceDays: 30,
    daysRemaining: 12,
    milestones: [
      {
        id: "m-1",
        title: "Demolition + dump",
        pct: 15,
        amount: 177_000,
        status: "approved",
        dueDate: "2026-04-08",
        approvedDate: "2026-04-09",
      },
      {
        id: "m-2",
        title: "Plumbing + electrical rough-in",
        pct: 25,
        amount: 295_000,
        status: "approved",
        dueDate: "2026-04-18",
        approvedDate: "2026-04-19",
      },
      {
        id: "m-3",
        title: "Cabinetry + counters",
        pct: 35,
        amount: 413_000,
        status: "submitted",
        dueDate: "2026-05-02",
      },
      {
        id: "m-4",
        title: "Tile + finishes",
        pct: 20,
        amount: 236_000,
        status: "in-progress",
        dueDate: "2026-05-10",
      },
      {
        id: "m-5",
        title: "Final QA",
        pct: 5,
        amount: 59_000,
        status: "pending",
        dueDate: "2026-05-15",
      },
    ],
    escrow: {
      held: 708_000,
      released: 472_000,
      pending: 413_000,
      refunded: 0,
    },
    ledger: [
      { date: "2026-04-01", type: "hold", amount: 1_180_000, note: "Contract signed; full amount held in escrow" },
      { date: "2026-04-09", type: "release", amount: 177_000, note: "Milestone 1 approved — Demolition" },
      { date: "2026-04-19", type: "release", amount: 295_000, note: "Milestone 2 approved — Rough-in" },
    ],
  },
  {
    id: "PRJ-2026-002",
    jobId: "j-001",
    clientId: "marlon-r",
    clientName: "Marlon R.",
    contractorId: "stormshield-roofing",
    contractorName: "Stormshield Roofing",
    contractorAvatar:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=300&q=80&auto=format&fit=crop",
    title: "Re-roof 120 sqm two-storey home",
    category: "Roofing",
    location: "Quezon City",
    stage: 6,
    contractValue: 285_000,
    startDate: "2026-04-15",
    endDate: "2026-04-29",
    graceDays: 14,
    daysRemaining: -3,
    milestones: [
      {
        id: "m-1",
        title: "Tear-off + scaffold",
        pct: 30,
        amount: 85_500,
        status: "approved",
        dueDate: "2026-04-19",
        approvedDate: "2026-04-19",
      },
      {
        id: "m-2",
        title: "Frame + underlayment",
        pct: 35,
        amount: 99_750,
        status: "approved",
        dueDate: "2026-04-23",
        approvedDate: "2026-04-24",
      },
      {
        id: "m-3",
        title: "Steel install + gutters",
        pct: 25,
        amount: 71_250,
        status: "submitted",
        dueDate: "2026-04-28",
      },
      {
        id: "m-4",
        title: "Cleanup + final walk",
        pct: 10,
        amount: 28_500,
        status: "pending",
        dueDate: "2026-04-29",
      },
    ],
    escrow: {
      held: 99_750,
      released: 185_250,
      pending: 71_250,
      refunded: 0,
    },
    ledger: [
      { date: "2026-04-15", type: "hold", amount: 285_000, note: "Contract signed" },
      { date: "2026-04-19", type: "release", amount: 85_500, note: "Milestone 1 approved — Tear-off" },
      { date: "2026-04-24", type: "release", amount: 99_750, note: "Milestone 2 approved — Frame" },
    ],
  },
  {
    id: "PRJ-2026-003",
    jobId: "j-003",
    clientId: "daniel-o",
    clientName: "Daniel O.",
    contractorId: "aquaflow-plumbing",
    contractorName: "AquaFlow Plumbing",
    contractorAvatar:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&q=80&auto=format&fit=crop",
    title: "Master bath leak repair + retiling",
    category: "Plumbing",
    location: "Pasig",
    stage: 8,
    contractValue: 48_000,
    startDate: "2026-03-15",
    endDate: "2026-03-19",
    graceDays: 7,
    daysRemaining: 999, // archived
    milestones: [
      {
        id: "m-1",
        title: "Leak source diagnosis",
        pct: 25,
        amount: 12_000,
        status: "approved",
        dueDate: "2026-03-15",
        approvedDate: "2026-03-15",
      },
      {
        id: "m-2",
        title: "Repair + waterproof",
        pct: 50,
        amount: 24_000,
        status: "approved",
        dueDate: "2026-03-17",
        approvedDate: "2026-03-17",
      },
      {
        id: "m-3",
        title: "Retile + grout",
        pct: 25,
        amount: 12_000,
        status: "approved",
        dueDate: "2026-03-19",
        approvedDate: "2026-03-19",
      },
    ],
    escrow: { held: 0, released: 48_000, pending: 0, refunded: 0 },
    ledger: [
      { date: "2026-03-14", type: "hold", amount: 48_000, note: "Contract signed" },
      { date: "2026-03-15", type: "release", amount: 12_000, note: "Milestone 1 approved" },
      { date: "2026-03-17", type: "release", amount: 24_000, note: "Milestone 2 approved" },
      { date: "2026-03-19", type: "release", amount: 12_000, note: "Final milestone — project closed" },
    ],
  },
]

export function findProject(id: string) {
  return projects.find((p) => p.id === id)
}
