import { cn } from "@/lib/utils"
import { type AvailabilityCell } from "./contractors-data"

const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"]

const statusStyle: Record<AvailabilityCell["status"], string> = {
  available: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  tentative: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  booked: "bg-muted text-muted-foreground line-through",
}

export function AvailabilityCalendar({ cells }: { cells: AvailabilityCell[] }) {
  if (cells.length === 0) return null
  const first = new Date(cells[0].date)
  const offset = first.getDay()
  const monthLabel = first.toLocaleString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="rounded-none border border-border bg-white p-5">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-black">{monthLabel}</h3>
        <div className="flex items-center gap-3 text-[10px] tracking-widest text-muted-foreground uppercase">
          <Legend dot="bg-emerald-400" label="Open" />
          <Legend dot="bg-amber-400" label="Tentative" />
          <Legend dot="bg-zinc-300" label="Booked" />
        </div>
      </header>
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {dayHeaders.map((d, i) => (
          <span
            key={i}
            className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {cells.map((c) => {
          const day = new Date(c.date).getDate()
          return (
            <span
              key={c.date}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-xs font-semibold",
                statusStyle[c.status]
              )}
            >
              {day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("inline-block size-2 rounded-full", dot)} />
      {label}
    </span>
  )
}
