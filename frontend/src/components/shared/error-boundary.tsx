import { Component, type ErrorInfo, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <HugeiconsIcon icon={AlertCircleIcon} className="size-7" />
          </span>
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            We hit an unexpected error. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-soft"
          >
            Refresh page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}