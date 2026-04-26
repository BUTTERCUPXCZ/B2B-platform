import { useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Clock01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const categories = ["All", "Playbooks", "Case Studies", "Product", "Industry"] as const
type Category = (typeof categories)[number]

type Post = {
  category: Exclude<Category, "All">
  title: string
  excerpt: string
  author: string
  readTime: string
  image: string
  featured?: boolean
}

const posts: Post[] = [
  {
    category: "Playbooks",
    title: "How to digitize a materials yard in 60 days",
    excerpt:
      "A week-by-week implementation playbook for moving from spreadsheets and WhatsApp to a B2B storefront with net-terms billing.",
    author: "Cara Lim",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    category: "Case Studies",
    title: "How Skyline Materials 3×'d order volume in two quarters",
    excerpt:
      "From paper invoices to a B2B storefront with 12 contractor accounts on net-30 — and why the warehouse team finally trusts the inventory ledger.",
    author: "Marlon Reyes",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Product",
    title: "Inside the new approval workflows engine",
    excerpt:
      "Why we rebuilt approvals from scratch, what changed in the data model, and how to migrate from the legacy chain rules.",
    author: "Adi Santoso",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Industry",
    title: "What the 2026 construction commerce market looks like",
    excerpt:
      "Procurement is finally going digital. We surveyed 240 operators across 12 countries about their plans for the next 18 months.",
    author: "Priya Hassan",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Playbooks",
    title: "Underwriting net-terms for new contractor accounts",
    excerpt:
      "A practical credit-check workflow that lets you say yes to 80% of new accounts without taking on bad debt.",
    author: "Jonas Park",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Case Studies",
    title: "Heritage Renovation runs 24 crews on one project workspace",
    excerpt:
      "Going from a paper logbook to a shared field feed cut a full ops hire from the budget — and crews actually adopted it.",
    author: "Elena Marsh",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Product",
    title: "Multi-branch inventory: how the new ledger works",
    excerpt:
      "Behind the redesign of inventory transfers, low-stock alerts, and serialized SKUs across multiple yards.",
    author: "Renata Cruz",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Industry",
    title: "Why combined materials + services is the breakout segment",
    excerpt:
      "Operators who run both lines convert 2× better than pure suppliers. Here's what the data says about why.",
    author: "Cara Lim",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Playbooks",
    title: "Migrating a 20,000-SKU catalog without downtime",
    excerpt:
      "A staged migration approach we use with our largest customers — including the validation queries to run before flipping the switch.",
    author: "Adi Santoso",
    readTime: "13 min",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80&auto=format&fit=crop",
  },
]

export function PostGrid() {
  const [active, setActive] = useState<Category>("All")
  const visible =
    active === "All" ? posts : posts.filter((p) => p.category === active)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
              Library
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              Latest Reads
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "relative rounded-full px-4 py-2 transition-colors",
                  active === c
                    ? "text-white"
                    : "bg-brand-black/5 text-brand-black/70 hover:bg-brand-orange/10 hover:text-brand-orange"
                )}
              >
                {active === c && (
                  <motion.span
                    layoutId="post-filter"
                    className="absolute inset-0 rounded-full bg-brand-orange"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <StaggerGroup
          key={active}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {visible.map((p) => (
            <StaggerItem key={p.title}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-sm text-brand-black/55">
            No posts in this category yet — try another tab.
          </p>
        )}
      </div>
    </section>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-black/10 bg-white transition-shadow hover:shadow-[0_25px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        <span className="absolute top-4 left-4 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug font-bold text-brand-black transition-colors group-hover:text-brand-orange">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-black/60">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-brand-black/10 pt-4 text-xs text-brand-black/55">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={UserCircleIcon} className="size-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
            {post.readTime}
          </span>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            className="size-4 text-brand-black/40 transition-colors group-hover:text-brand-orange"
          />
        </div>
      </div>
    </article>
  )
}
