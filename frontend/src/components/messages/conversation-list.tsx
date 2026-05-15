import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { UserAvatar as Avatar } from "@/components/shared/user-avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { type Conversation } from "./messages-data"

const roleLabel: Record<Conversation["participantRole"], string> = {
  client: "Client",
  contractor: "Contractor",
  seller: "Seller",
  company: "Company",
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <aside className="flex h-full flex-col rounded-none border border-border bg-white">
      <div className="border-b border-border p-4">
        <label className="relative block">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input placeholder="Search messages..." className="h-10 pl-10" />
        </label>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {conversations.map((c) => {
          const active = selectedId === c.id
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors",
                  active ? "bg-brand-orange/10" : "hover:bg-muted"
                )}
              >
                <Avatar src={c.participantAvatar} alt={c.participantName} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-brand-black">
                      {c.participantName}
                    </p>
                    <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      {c.lastAt}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    {roleLabel[c.participantRole]}
                  </p>
                  <p className="mt-1 truncate text-xs text-brand-black/70">
                    {c.lastMessage}
                  </p>
                </div>
                {c.unread > 0 && (
                  <Badge variant="accent" size="sm">
                    {c.unread}
                  </Badge>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
