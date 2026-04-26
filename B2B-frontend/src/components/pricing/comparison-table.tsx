import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

type Cell = boolean | string

const groups: Array<{
  label: string
  rows: Array<{ feature: string; starter: Cell; growth: Cell; pro: Cell }>
}> = [
  {
    label: "Storefront & Listings",
    rows: [
      { feature: "Storefront page on Buildora", starter: true, growth: true, pro: true },
      { feature: "Active listings", starter: "100", growth: "1,000", pro: "Unlimited" },
      { feature: "Custom storefront URL", starter: false, growth: true, pro: true },
      { feature: "Featured placement on category pages", starter: false, growth: true, pro: true },
      { feature: "Top-of-feed home & search placement", starter: false, growth: false, pro: true },
    ],
  },
  {
    label: "Fees",
    rows: [
      { feature: "Monthly subscription", starter: "Free", growth: "₱4,990", pro: "₱14,990" },
      { feature: "Sales commission (per material order)", starter: "8%", growth: "5%", pro: "3%" },
      { feature: "Service commission (per won job)", starter: "8%", growth: "6%", pro: "4%" },
      { feature: "Payouts", starter: "Weekly", growth: "Weekly", pro: "Daily" },
      { feature: "Payment processing", starter: "Included", growth: "Included", pro: "Included" },
    ],
  },
  {
    label: "Marketing & Growth",
    rows: [
      { feature: "Promo codes & discount campaigns", starter: false, growth: true, pro: true },
      { feature: "Flash-deal slots on home page", starter: false, growth: "2 / mo", pro: "Unlimited" },
      { feature: "Verified-pro badge eligibility", starter: false, growth: true, pro: true },
      { feature: "Custom contract pricing per buyer", starter: false, growth: false, pro: true },
      { feature: "Storefront analytics & cohorts", starter: "Basic", growth: "Full", pro: "Full + API" },
    ],
  },
  {
    label: "Support",
    rows: [
      { feature: "Email support", starter: true, growth: true, pro: true },
      { feature: "Chat support SLA", starter: "24h", growth: "4h", pro: "1h" },
      { feature: "Onboarding migration manager", starter: false, growth: true, pro: true },
      { feature: "Dedicated success manager", starter: false, growth: false, pro: true },
      { feature: "Quarterly performance reviews", starter: false, growth: false, pro: true },
      { feature: "Open API & webhook access", starter: false, growth: false, pro: true },
    ],
  },
]

const cols = ["starter", "growth", "pro"] as const

export function ComparisonTable() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Compare Seller Plans
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
            Every benefit, side by side.
          </h2>
        </div>

        <div className="overflow-x-auto rounded-md border border-brand-black/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="bg-brand-black text-white">
                <th className="w-2/5 px-6 py-5 text-xs font-semibold tracking-[0.2em] uppercase">
                  Feature
                </th>
                {cols.map((c, idx) => (
                  <th
                    key={c}
                    className={cn(
                      "px-4 py-5 text-center text-xs font-semibold tracking-[0.2em] uppercase",
                      idx === 1 && "bg-brand-orange"
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g, gi) => (
                <Group key={g.label} label={g.label} first={gi === 0}>
                  {g.rows.map((row, ri) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "border-t border-brand-black/10",
                        ri % 2 === 0 ? "bg-white" : "bg-brand-orange/[0.03]"
                      )}
                    >
                      <td className="px-6 py-4 text-brand-black/80">
                        {row.feature}
                      </td>
                      {cols.map((c, idx) => (
                        <td
                          key={c}
                          className={cn(
                            "px-4 py-4 text-center text-brand-black/80",
                            idx === 1 && "bg-brand-orange/[0.05] font-semibold"
                          )}
                        >
                          <CellValue value={row[c]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Group>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Group({
  label,
  first,
  children,
}: {
  label: string
  first: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <tr
        className={cn(
          "bg-brand-black/[0.04]",
          !first && "border-t-4 border-white"
        )}
      >
        <td
          colSpan={4}
          className="px-6 py-3 text-[10px] font-bold tracking-[0.3em] text-brand-orange uppercase"
        >
          {label}
        </td>
      </tr>
      {children}
    </>
  )
}

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <HugeiconsIcon
        icon={CheckmarkCircle02Icon}
        className="mx-auto size-5 text-brand-orange"
      />
    )
  if (value === false)
    return (
      <HugeiconsIcon
        icon={MinusSignIcon}
        className="mx-auto size-4 text-brand-black/25"
      />
    )
  return <span>{value}</span>
}
