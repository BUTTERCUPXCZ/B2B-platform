import {
  LayersIcon,
  Building03Icon,
  Tree02Icon,
  Layers01Icon,
  PaintBucketIcon,
  ToolsIcon,
  TapIcon,
  FlashIcon,
  House04Icon,
  Door01Icon,
  Wrench01Icon,
  PlantIcon,
} from "@hugeicons/core-free-icons"

export type ProductCategory =
  | "Cement & Concrete"
  | "Steel & Rebar"
  | "Lumber & Wood"
  | "Tiles & Flooring"
  | "Paint & Finishes"
  | "Tools & Equipment"
  | "Plumbing"
  | "Electrical"
  | "Roofing"
  | "Doors & Windows"
  | "Hardware"
  | "Landscaping"

export const productCategories: { name: ProductCategory; icon: typeof LayersIcon; count: number }[] = [
  { name: "Cement & Concrete", icon: LayersIcon, count: 2_400 },
  { name: "Steel & Rebar", icon: Building03Icon, count: 1_180 },
  { name: "Lumber & Wood", icon: Tree02Icon, count: 3_650 },
  { name: "Tiles & Flooring", icon: Layers01Icon, count: 5_210 },
  { name: "Paint & Finishes", icon: PaintBucketIcon, count: 2_090 },
  { name: "Tools & Equipment", icon: ToolsIcon, count: 8_420 },
  { name: "Plumbing", icon: TapIcon, count: 1_940 },
  { name: "Electrical", icon: FlashIcon, count: 2_330 },
  { name: "Roofing", icon: House04Icon, count: 880 },
  { name: "Doors & Windows", icon: Door01Icon, count: 1_420 },
  { name: "Hardware", icon: Wrench01Icon, count: 6_150 },
  { name: "Landscaping", icon: PlantIcon, count: 1_070 },
]

export type Product = {
  id: string
  name: string
  category: ProductCategory
  supplier: string
  rating: number
  reviews: string
  price: number
  oldPrice?: number
  image: string
  badge?: "Top Seller" | "New" | "Bulk Discount"
  unit: string
}

export const products: Product[] = [
  {
    id: "cement-portland-40kg",
    name: "Portland Cement (40kg) — Type I",
    category: "Cement & Concrete",
    supplier: "Eagle Materials",
    rating: 4.8,
    reviews: "1.2k",
    price: 265,
    oldPrice: 350,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop",
    badge: "Top Seller",
    unit: "per bag",
  },
  {
    id: "tiles-porcelain-60x60",
    name: "Porcelain Tiles 60×60 — Matte Grey",
    category: "Tiles & Flooring",
    supplier: "Mosaic Yard Co.",
    rating: 4.7,
    reviews: "640",
    price: 899,
    oldPrice: 1290,
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80&auto=format&fit=crop",
    unit: "per box (1.44 m²)",
  },
  {
    id: "paint-latex-4l-eggshell",
    name: "Premium Latex Paint — 4L Eggshell",
    category: "Paint & Finishes",
    supplier: "ProCoat Supply",
    rating: 4.9,
    reviews: "2.1k",
    price: 799,
    oldPrice: 1150,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80&auto=format&fit=crop",
    badge: "Top Seller",
    unit: "per gallon",
  },
  {
    id: "rebar-grade60-12mm",
    name: "Rebar — Grade 60, 12mm × 6m (10pc)",
    category: "Steel & Rebar",
    supplier: "Steelhouse Pasig",
    rating: 4.6,
    reviews: "380",
    price: 3499,
    oldPrice: 4500,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&auto=format&fit=crop",
    unit: "per bundle",
  },
  {
    id: "drill-cordless-18v",
    name: "Cordless Drill Kit — 18V, 2 Batt",
    category: "Tools & Equipment",
    supplier: "BoltWorks Hardware",
    rating: 4.9,
    reviews: "3.4k",
    price: 4890,
    oldPrice: 6990,
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&auto=format&fit=crop",
    unit: "per unit",
  },
  {
    id: "plywood-marine-18mm",
    name: "Marine Plywood 4×8 — 18mm",
    category: "Lumber & Wood",
    supplier: "Greenbelt Lumber",
    rating: 4.7,
    reviews: "510",
    price: 1399,
    oldPrice: 1850,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop",
    unit: "per sheet",
  },
  {
    id: "pvc-pipe-3in",
    name: "PVC Pipe 3in × 3m — Sched 40",
    category: "Plumbing",
    supplier: "AquaFlow Plumbing",
    rating: 4.8,
    reviews: "920",
    price: 425,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80&auto=format&fit=crop",
    unit: "per length",
  },
  {
    id: "wire-thhn-12awg",
    name: "THHN Stranded Wire 12 AWG — 75m",
    category: "Electrical",
    supplier: "Sparkline Electric",
    rating: 4.9,
    reviews: "1.5k",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&q=80&auto=format&fit=crop",
    badge: "New",
    unit: "per roll",
  },
  {
    id: "roofing-corrugated",
    name: "Corrugated Metal Roofing — 8ft",
    category: "Roofing",
    supplier: "Stormshield Roofing",
    rating: 4.6,
    reviews: "210",
    price: 980,
    oldPrice: 1240,
    image:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=600&q=80&auto=format&fit=crop",
    unit: "per sheet",
  },
  {
    id: "door-solid-mahogany",
    name: "Solid Mahogany Door — 36in × 80in",
    category: "Doors & Windows",
    supplier: "Greenbelt Lumber",
    rating: 4.8,
    reviews: "180",
    price: 8990,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format&fit=crop",
    unit: "per door",
  },
  {
    id: "screwdriver-set",
    name: "Insulated Screwdriver Set — 12pc",
    category: "Hardware",
    supplier: "BoltWorks Hardware",
    rating: 4.7,
    reviews: "2.6k",
    price: 1450,
    oldPrice: 1990,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&q=80&auto=format&fit=crop",
    unit: "per set",
    badge: "Bulk Discount",
  },
  {
    id: "soil-topsoil-50l",
    name: "Premium Topsoil — 50L Bag",
    category: "Landscaping",
    supplier: "Greenroot Garden Supply",
    rating: 4.5,
    reviews: "340",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1599598425947-5ed40b8a4b1d?w=600&q=80&auto=format&fit=crop",
    unit: "per bag",
  },
]

export const sortOptions = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
] as const

export type SortOption = (typeof sortOptions)[number]["id"]
