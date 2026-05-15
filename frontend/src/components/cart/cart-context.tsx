import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"

import { products, type Product } from "@/components/shop/shop-data"

const STORAGE_KEY = "struktura:cart:v1"

const productMap = new Map(products.map((p) => [p.id, p]))

export type CartItem = {
  productId: string
  qty: number
}

type State = {
  items: CartItem[]
}

type Action =
  | { type: "add"; productId: string; qty?: number }
  | { type: "remove"; productId: string }
  | { type: "setQty"; productId: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] }

const initial: State = { items: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const qty = action.qty ?? 1
      const existing = state.items.find((i) => i.productId === action.productId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.productId
              ? { ...i, qty: i.qty + qty }
              : i
          ),
        }
      }
      return { items: [...state.items, { productId: action.productId, qty }] }
    }
    case "remove":
      return { items: state.items.filter((i) => i.productId !== action.productId) }
    case "setQty":
      return {
        items: state.items
          .map((i) =>
            i.productId === action.productId ? { ...i, qty: action.qty } : i
          )
          .filter((i) => i.qty > 0),
      }
    case "clear":
      return { items: [] }
    case "hydrate":
      return { items: action.items }
    default:
      return state
  }
}

type CartCtx = {
  items: CartItem[]
  count: number
  subtotal: number
  commission: number
  total: number
  lines: Array<{ product: Product; qty: number; lineTotal: number }>
  add: (productId: string, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed })
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const value = useMemo<CartCtx>(() => {
    const lines = state.items
      .map((it) => {
        const product = productMap.get(it.productId)
        if (!product) return null
        return { product, qty: it.qty, lineTotal: product.price * it.qty }
      })
      .filter((x): x is { product: Product; qty: number; lineTotal: number } => x !== null)

    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0)
    const commission = Math.round(subtotal * 0.08)
    const total = subtotal + commission
    const count = state.items.reduce((s, i) => s + i.qty, 0)

    return {
      items: state.items,
      count,
      subtotal,
      commission,
      total,
      lines,
      add: (productId, qty) => dispatch({ type: "add", productId, qty }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      setQty: (productId, qty) => dispatch({ type: "setQty", productId, qty }),
      clear: () => dispatch({ type: "clear" }),
    }
  }, [state.items])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useCart must be used within <CartProvider>")
  return ctx
}