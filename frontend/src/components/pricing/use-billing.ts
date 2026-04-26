import { useState } from "react"

export type Billing = "monthly" | "annual"

export function useBilling() {
  return useState<Billing>("annual")
}
