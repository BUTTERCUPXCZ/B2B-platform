import { type ReactNode, useEffect, useRef } from "react"
import { Link } from "@tanstack/react-router"

import { cn } from "@/lib/utils"
import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { type Conversation, type Message } from "./messages-data"

const roleSubtitle: Record<Conversation["participantRole"], string> = {
  contractor: "Verified contractor",
  seller: "Hardware supplier",
  company: "Service company",
  client: "Client",
}

export function MessageThread({
  conversation,
  messages,
  composer,
}: {
  conversation: Conversation
  messages: Message[]
  composer: ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" })
  }, [messages.length])

  return (
    <div className="flex h-full flex-col rounded-none border border-border bg-white">
      <header className="flex items-center justify-between gap-3 border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar src={conversation.participantAvatar} alt={conversation.participantName} size="md" />
          <div>
            <p className="font-semibold text-brand-black">{conversation.participantName}</p>
            <p className="text-xs text-muted-foreground">
              {roleSubtitle[conversation.participantRole]}
            </p>
          </div>
        </div>
        {conversation.relatedProjectId && (
          <Link
            to="/projects/$projectId"
            params={{ projectId: conversation.relatedProjectId }}
            className="inline-flex items-center gap-1 rounded-none border border-border bg-white px-3 py-1.5 text-[10px] font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
          >
            View project
          </Link>
        )}
        {conversation.relatedJobId && !conversation.relatedProjectId && (
          <Link
            to="/jobs/$jobId"
            params={{ jobId: conversation.relatedJobId }}
            className="inline-flex items-center gap-1 rounded-none border border-border bg-white px-3 py-1.5 text-[10px] font-semibold tracking-widest text-brand-black uppercase hover:bg-muted"
          >
            View job
          </Link>
        )}
      </header>

      <div ref={ref} className="flex-1 overflow-y-auto p-5">
        <ul className="flex flex-col gap-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={cn(
                "flex max-w-[85%] flex-col gap-1",
                m.from === "me" ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "rounded-none px-4 py-2.5 text-sm",
                  m.from === "me"
                    ? "rounded-br-sm bg-brand-orange text-white"
                    : "rounded-bl-sm bg-muted text-brand-black"
                )}
              >
                {m.body}
              </div>
              <span className="px-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                {m.sentAt}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {composer}

      <footer className="border-t border-border p-3 text-center">
        <Badge variant="muted" size="sm">
          Messages encrypted in transit · admin-readable for dispute review
        </Badge>
      </footer>
    </div>
  )
}
