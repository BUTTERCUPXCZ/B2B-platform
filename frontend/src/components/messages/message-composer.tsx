import { useState, type FormEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { SentIcon, Attachment01Icon } from "@hugeicons/core-free-icons"

import { Textarea } from "@/components/ui/textarea"

export function MessageComposer({
  onSend,
}: {
  onSend: (body: string) => void
}) {
  const [text, setText] = useState("")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText("")
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3 border-t border-border p-4">
      <button
        type="button"
        aria-label="Attach"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-brand-black"
      >
        <HugeiconsIcon icon={Attachment01Icon} className="size-4" />
      </button>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            submit(e as unknown as FormEvent)
          }
        }}
        className="min-h-12 flex-1 resize-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-none bg-brand-orange text-white transition-colors hover:bg-brand-orange-soft disabled:opacity-50"
        aria-label="Send"
      >
        <HugeiconsIcon icon={SentIcon} className="size-4" />
      </button>
    </form>
  )
}
