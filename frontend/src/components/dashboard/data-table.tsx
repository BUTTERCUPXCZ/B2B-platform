import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type Column<T> = {
  header: string
  accessor: (row: T) => ReactNode
  align?: "left" | "right"
  className?: string
}

export function DataTable<T>({
  rows,
  columns,
  empty = "Nothing here yet.",
}: {
  rows: T[]
  columns: Column<T>[]
  empty?: string
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
        {empty}
      </div>
    )
  }
  return (
    <div className="overflow-x-auto rounded-none border border-border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs tracking-widest text-muted-foreground uppercase">
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                className={cn(
                  "px-4 py-3 font-semibold",
                  c.align === "right" ? "text-right" : "text-left",
                  c.className
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {columns.map((c, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-3 align-middle",
                    c.align === "right" ? "text-right" : "text-left",
                    c.className
                  )}
                >
                  {c.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
