export type EstimateLine = {
  item: string
  qty: number
  unit: string
  unitPrice: number
  total: number
}

export type LaborLine = {
  trade: string
  days: number
  rate: number
  total: number
}

export type EstimateTier = "standard" | "mid" | "premium"

export type Estimate = {
  id: string
  projectType: string
  location: string
  areaSqm: number
  tier: EstimateTier
  materials: EstimateLine[]
  labor: LaborLine[]
  contingencyPct: number
  regionalAdjPct: number
  subtotal: number
  contingency: number
  regionalAdjustment: number
  total: number
  validUntil: string
  estimatorName: string
  notes: string
  createdAt: string
}

const sampleMaterials: EstimateLine[] = [
  { item: "Portland cement (40kg)", qty: 220, unit: "bag", unitPrice: 265, total: 58_300 },
  { item: "Rebar 12mm × 6m", qty: 80, unit: "pc", unitPrice: 350, total: 28_000 },
  { item: "Hollow blocks 6\"", qty: 1800, unit: "pc", unitPrice: 18, total: 32_400 },
  { item: "Sand & gravel mix", qty: 18, unit: "m³", unitPrice: 1_400, total: 25_200 },
  { item: "Marine plywood 18mm", qty: 36, unit: "sheet", unitPrice: 1_399, total: 50_364 },
  { item: "Tiles 60×60 porcelain", qty: 110, unit: "m²", unitPrice: 624, total: 68_640 },
  { item: "Latex paint 4L", qty: 22, unit: "gallon", unitPrice: 799, total: 17_578 },
  { item: "PVC pipe assorted", qty: 45, unit: "length", unitPrice: 425, total: 19_125 },
  { item: "THHN wire 12 AWG", qty: 8, unit: "roll", unitPrice: 1_290, total: 10_320 },
]

const sampleLabor: LaborLine[] = [
  { trade: "Carpentry", days: 22, rate: 1_400, total: 30_800 },
  { trade: "Masonry", days: 28, rate: 1_500, total: 42_000 },
  { trade: "Electrical", days: 8, rate: 1_800, total: 14_400 },
  { trade: "Plumbing", days: 6, rate: 1_800, total: 10_800 },
  { trade: "Painting", days: 12, rate: 1_300, total: 15_600 },
]

function computeTotals(materials: EstimateLine[], labor: LaborLine[], contingencyPct: number, regionalAdjPct: number) {
  const subtotal =
    materials.reduce((s, l) => s + l.total, 0) + labor.reduce((s, l) => s + l.total, 0)
  const contingency = Math.round(subtotal * (contingencyPct / 100))
  const regionalAdjustment = Math.round(subtotal * (regionalAdjPct / 100))
  const total = subtotal + contingency + regionalAdjustment
  return { subtotal, contingency, regionalAdjustment, total }
}

const totals1 = computeTotals(sampleMaterials, sampleLabor, 12, 4)

export const estimates: Estimate[] = [
  {
    id: "EST-2026-001",
    projectType: "Single-family home (1-storey)",
    location: "Quezon City, NCR",
    areaSqm: 95,
    tier: "mid",
    materials: sampleMaterials,
    labor: sampleLabor,
    contingencyPct: 12,
    regionalAdjPct: 4,
    ...totals1,
    validUntil: validUntil(30),
    estimatorName: "Engr. Lara Tanada",
    notes:
      "Estimate based on standard mid-range finishes for NCR pricing. Excludes lot acquisition, permits beyond barangay/Mayor, and architect fees.",
    createdAt: today(-2),
  },
  {
    id: "EST-2026-002",
    projectType: "Kitchen renovation",
    location: "Makati, NCR",
    areaSqm: 18,
    tier: "premium",
    materials: sampleMaterials.slice(0, 6),
    labor: sampleLabor.slice(0, 3),
    contingencyPct: 15,
    regionalAdjPct: 6,
    ...computeTotals(sampleMaterials.slice(0, 6), sampleLabor.slice(0, 3), 15, 6),
    validUntil: validUntil(30),
    estimatorName: "Engr. Mateo Bautista",
    notes:
      "Premium-tier finishes — granite tops, imported tile, branded plumbing fixtures. Stripped down to walls before rebuild.",
    createdAt: today(-7),
  },
]

function today(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

function validUntil(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export function findEstimate(id: string) {
  return estimates.find((e) => e.id === id)
}
