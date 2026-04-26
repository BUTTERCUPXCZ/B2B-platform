import { motion, useReducedMotion, type Variants } from "motion/react"
import { type ComponentProps, type ReactNode } from "react"
import { ease, fadeUp, stagger } from "./variants"

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "section"
  amount?: number
}) {
  const reduce = useReducedMotion()
  const Comp = as === "section" ? motion.section : motion.div
  if (reduce) return <Comp className={className}>{children}</Comp>
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease, delay },
        },
      }}
    >
      {children}
    </Comp>
  )
}

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
  variants = stagger,
}: {
  children: ReactNode
  className?: string
  amount?: number
  variants?: Variants
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  ...rest
}: {
  children: ReactNode
  className?: string
  variants?: Variants
} & Omit<ComponentProps<typeof motion.div>, "variants" | "children" | "className">) {
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}
