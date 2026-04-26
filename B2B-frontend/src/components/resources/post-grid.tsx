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

const categories = ["All", "Buying Guides", "Selling on Buildora", "Project Stories", "Industry"] as const
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
    category: "Buying Guides",
    title: "How to compare cement brands without getting burned",
    excerpt:
      "Type, strength class, setting time, fineness — what actually matters when you're filling a warehouse cart, and what's marketing fluff.",
    author: "Cara Lim",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    category: "Project Stories",
    title: "From bare lot to handover: a ₱4.8M Cebu coastal home",
    excerpt:
      "Inside the 9-month build of the Cebu Coastal Residence — every supplier hired through Buildora, every milestone signed off in escrow.",
    author: "Heritage Build Co.",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Selling on Buildora",
    title: "10 listing photos that actually sell tiles",
    excerpt:
      "We analyzed 1,200 tile listings to figure out what photo composition triples click-through. Spoiler: lifestyle shots beat catalog shots, but not how you think.",
    author: "Adi Santoso",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Industry",
    title: "What homeowners actually fear about hiring a builder",
    excerpt:
      "We surveyed 1,400 homeowners who hired through Buildora about their pre-booking anxieties. Top three: cost overruns, no-shows, and quality. Here's how the platform fixes each.",
    author: "Priya Hassan",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Buying Guides",
    title: "How much rebar does a small house actually need?",
    excerpt:
      "A practical materials-takeoff cheat sheet for a 80sqm home — quantities, sizes, and the buffer percentage that saves you a second order.",
    author: "Jonas Park",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Selling on Buildora",
    title: "Going from local yard to top-3 supplier in your category",
    excerpt:
      "What sellers who hit Top Seller badge do differently — pricing strategy, listing cadence, response time, and how they handle returns.",
    author: "Renata Cruz",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Project Stories",
    title: "A BGC penthouse refit, end to end",
    excerpt:
      "How Northline Interiors used Buildora to source 47 SKUs from 9 sellers, schedule 5 service crews, and deliver a ₱950k refit two weeks early.",
    author: "Elena Marsh",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Buying Guides",
    title: "When to hire a builder vs. when to DIY",
    excerpt:
      "A decision tree for homeowners — based on job type, scope, regulatory requirements, and how much you actually value your weekends.",
    author: "Cara Lim",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "Industry",
    title: "How escrow changed buyer-seller trust in construction",
    excerpt:
      "Two years of dispute data from Buildora — what works, what we changed, and why the average dispute now resolves in 36 hours instead of 14 days.",
    author: "Priya Hassan",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=80&auto=format&fit=crop",
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
