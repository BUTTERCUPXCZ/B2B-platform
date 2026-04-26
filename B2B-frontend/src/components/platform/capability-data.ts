import {
  ShoppingBag02Icon,
  CustomerService01Icon,
  TaskDaily02Icon,
  Building03Icon,
  WarehouseIcon,
  Invoice02Icon,
  GlobeIcon,
  AnalyticsUpIcon,
} from "@hugeicons/core-free-icons"

export type Capability = {
  id: string
  icon: typeof ShoppingBag02Icon
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  image: string
}

export const capabilities: Capability[] = [
  {
    id: "storefront",
    icon: ShoppingBag02Icon,
    eyebrow: "Surface 01",
    title: "Materials e-commerce storefront",
    body: "A B2B-grade online store for materials, parts, and supplies — purpose-built for registered buyer accounts, not anonymous shoppers.",
    bullets: [
      "Per-buyer contract pricing & bulk tier pricing",
      "Quote-to-cart for registered accounts",
      "Branded subdomain or custom domain",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "quoting",
    icon: CustomerService01Icon,
    eyebrow: "Surface 02",
    title: "Service quoting & RFQs",
    body: "Take inbound requests for quotes, build line-item proposals from your service catalog, and route them through digital sign-off.",
    bullets: [
      "Reusable service catalog with markup rules",
      "Branded PDF quotes with one-click sign-off",
      "Auto-conversion of accepted quotes into projects",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "projects",
    icon: TaskDaily02Icon,
    eyebrow: "Surface 03",
    title: "Project workspace",
    body: "Run renovations and builds with milestones, daily reports, materials lists, and field photos — all in one feed your office and crews share.",
    bullets: [
      "Mobile-friendly daily reports & photo logs",
      "Materials reservation from yard inventory",
      "Customer-facing project timeline",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "accounts",
    icon: Building03Icon,
    eyebrow: "Surface 04",
    title: "B2B buyer accounts",
    body: "Multi-user accounts with approval limits, contract pricing, and the procurement-grade controls your largest buyers expect.",
    bullets: [
      "Multi-user with role & spend limits",
      "Per-buyer pricing books & catalog scopes",
      "Approval chains for high-value orders",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "inventory",
    icon: WarehouseIcon,
    eyebrow: "Surface 05",
    title: "Inventory & warehouses",
    body: "One ledger across every yard and branch — with transfers, low-stock alerts, and serialized tracking for high-value parts.",
    bullets: [
      "Multi-branch stock & inter-branch transfers",
      "Low-stock alerts & automatic reorder points",
      "Serialized inventory for parts & spares",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "billing",
    icon: Invoice02Icon,
    eyebrow: "Surface 06",
    title: "Invoicing & net-terms billing",
    body: "Net-30, 60, and 90 billing with automated dunning, statements, and aging reports — without bolting on a separate AR tool.",
    bullets: [
      "Net-30 / 60 / 90 with credit limits per buyer",
      "Automated statements & dunning emails",
      "Aging reports & accounting sync",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "portal",
    icon: GlobeIcon,
    eyebrow: "Surface 07",
    title: "Customer portal",
    body: "A dedicated buyer-facing portal where your customers track orders, request quotes, view contracts, and pay invoices on terms.",
    bullets: [
      "Order history, reordering & tracking",
      "RFQ inbox & quote acceptance",
      "Self-serve invoice payments",
    ],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "analytics",
    icon: AnalyticsUpIcon,
    eyebrow: "Surface 08",
    title: "Admin dashboard & analytics",
    body: "Live operational dashboards across orders, quotes, jobs, and AR — with cohort views you can drill from any angle.",
    bullets: [
      "Realtime KPIs across every surface",
      "Cohort & buyer-level revenue analysis",
      "Exportable reports for finance & ops",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
  },
]
