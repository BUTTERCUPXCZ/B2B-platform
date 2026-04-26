import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

type Cell = boolean | string

const groups: Array<{
  label: string
  rows: Array<{ feature: string; starter: Cell; growth: Cell; enterprise: Cell }>
}> = [
  {
    label: "Commerce & Catalog",
    rows: [
      { feature: "B2B materials storefront", starter: true, growth: true, enterprise: true },
      { feature: "Catalog SKUs", starter: "2,000", growth: "20,000", enterprise: "Unlimited" },
      { feature: "Bulk pricing tiers", starter: true, growth: true, enterprise: true },
      { feature: "Custom contract pricing per buyer", starter: false, growth: true, enterprise: true },
      { feature: "Quote-to-cart for registered accounts", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    label: "Quoting & Projects",
    rows: [
      { feature: "Service quoting & RFQs", starter: false, growth: true, enterprise: true },
      { feature: "Digital quote sign-off", starter: false, growth: true, enterprise: true },
      { feature: "Project workspace", starter: false, growth: true, enterprise: true },
      { feature: "Field reports & photo logs", starter: false, growth: true, enterprise: true },
      { feature: "Custom approval workflows", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    label: "Accounts & Billing",
    rows: [
      { feature: "Buyer account users", starter: "5", growth: "25", enterprise: "Unlimited" },
      { feature: "Branches", starter: "1", growth: "Up to 4", enterprise: "Unlimited" },
      { feature: "Net-30 / 60 / 90 billing", starter: false, growth: true, enterprise: true },
      { feature: "Multi-currency", starter: false, growth: true, enterprise: true },
      { feature: "Spend limits & approval chains", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    label: "Security & Support",
    rows: [
      { feature: "Email & chat support", starter: true, growth: true, enterprise: true },
      { feature: "Dedicated onboarding manager", starter: false, growth: true, enterprise: true },
      { feature: "Named CSM + QBRs", starter: false, growth: false, enterprise: true },
      { feature: "SSO, SCIM, audit logs", starter: false, growth: false, enterprise: true },
      { feature: "SOC 2 reports & DPA", starter: false, growth: false, enterprise: true },
      { feature: "Uptime SLA", starter: "99.9%", growth: "99.9%", enterprise: "99.99%" },
    ],
  },
]

const cols = ["starter", "growth", "enterprise"] as const

export function ComparisonTable() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Compare Plans
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-[44px]">
            Every Capability, Side By Side
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
