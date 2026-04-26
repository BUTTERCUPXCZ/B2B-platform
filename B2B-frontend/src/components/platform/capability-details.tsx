import { motion, useReducedMotion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { capabilities } from "./capability-data"

export function CapabilityDetails() {
  const reduce = useReducedMotion()
  return (
    <section className="bg-white py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6">
        {capabilities.map((c, i) => {
          const reverse = i % 2 === 1
          return (
            <motion.article
              key={c.id}
              id={c.id}
              className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={cn(reverse && "lg:order-2")}>
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
                  <span className="h-px w-6 bg-brand-orange" />
                  {c.eyebrow}
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                    <HugeiconsIcon icon={c.icon} className="size-6" />
                  </span>
                  <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-4xl">
                    {c.title}
                  </h2>
                </div>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-brand-black/65">
                  {c.body}
                </p>

                <ul className="mt-7 space-y-3 text-sm">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-brand-black/80"
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        className="mt-0.5 size-4 shrink-0 text-brand-orange"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase transition-colors hover:text-brand-black"
                >
                  Read documentation
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
                </a>
              </div>

              <div className={cn("relative", reverse && "lg:order-1")}>
                <div
                  className="aspect-[4/3] w-full overflow-hidden rounded-md bg-cover bg-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
                <span className="absolute -bottom-3 left-6 rounded-full bg-brand-orange px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-white uppercase shadow-lg">
                  {c.eyebrow}
                </span>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
