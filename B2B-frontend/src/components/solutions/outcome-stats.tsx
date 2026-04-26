import { StaggerGroup, StaggerItem } from "@/components/motion/primitives"

const stats = [
  { value: "3×", label: "More orders processed", suffix: "vs. spreadsheet baseline" },
  { value: "40%", label: "Faster quote turnaround", suffix: "median across 200+ customers" },
  { value: "60%", label: "Less spreadsheet time", suffix: "ops & finance teams combined" },
  { value: "<60d", label: "Average implementation", suffix: "Growth & Enterprise plans" },
]

export function OutcomeStats() {
  return (
    <section className="bg-brand-orange py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="border-l-2 border-white/30 pl-5">
              <p className="text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
                {s.value}
              </p>
              <p className="mt-3 text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs text-white/75">{s.suffix}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
