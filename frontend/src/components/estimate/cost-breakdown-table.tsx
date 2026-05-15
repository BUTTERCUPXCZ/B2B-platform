import { peso } from "@/components/shared/price-tag"
import { type EstimateLine, type LaborLine } from "./estimates-data"

export function MaterialsTable({ rows }: { rows: EstimateLine[] }) {
  const total = rows.reduce((s, r) => s + r.total, 0)
  return (
    <div className="overflow-x-auto rounded-none border border-border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-xs tracking-widest text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Item</th>
            <th className="px-4 py-3 text-right">Qty</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3 text-right">Unit price</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-3 font-medium text-brand-black">{r.item}</td>
              <td className="px-4 py-3 text-right tabular-nums">{r.qty}</td>
              <td className="px-4 py-3 text-brand-black/70">{r.unit}</td>
              <td className="px-4 py-3 text-right tabular-nums">{peso(r.unitPrice)}</td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums">{peso(r.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-brand-black/20">
            <td colSpan={4} className="px-4 py-3 text-right text-xs tracking-widest text-muted-foreground uppercase">
              Materials subtotal
            </td>
            <td className="px-4 py-3 text-right text-base font-bold tabular-nums">
              {peso(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export function LaborTable({ rows }: { rows: LaborLine[] }) {
  const total = rows.reduce((s, r) => s + r.total, 0)
  return (
    <div className="overflow-x-auto rounded-none border border-border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-xs tracking-widest text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Trade</th>
            <th className="px-4 py-3 text-right">Days</th>
            <th className="px-4 py-3 text-right">Rate / day</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-3 font-medium text-brand-black">{r.trade}</td>
              <td className="px-4 py-3 text-right tabular-nums">{r.days}</td>
              <td className="px-4 py-3 text-right tabular-nums">{peso(r.rate)}</td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums">{peso(r.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-brand-black/20">
            <td colSpan={3} className="px-4 py-3 text-right text-xs tracking-widest text-muted-foreground uppercase">
              Labor subtotal
            </td>
            <td className="px-4 py-3 text-right text-base font-bold tabular-nums">
              {peso(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
