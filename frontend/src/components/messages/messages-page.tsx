import { useEffect, useMemo, useState } from "react"
import { Mail01Icon } from "@hugeicons/core-free-icons"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { EmptyState } from "@/components/ui/empty-state"
import {
  conversations as seedConversations,
  messagesByConversation,
  type Conversation,
  type Message,
} from "./messages-data"
import { ConversationList } from "./conversation-list"
import { MessageThread } from "./message-thread"
import { MessageComposer } from "./message-composer"

export function MessagesPage({ to }: { to?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(messagesByConversation)
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations)

  // Pick conversation by participantId if `to` provided, else default to first.
  useEffect(() => {
    if (selectedId) return
    if (to) {
      const match = conversations.find((c) => c.participantId === to)
      if (match) {
        setSelectedId(match.id)
        return
      }
    }
    if (conversations[0]) setSelectedId(conversations[0].id)
  }, [to, selectedId, conversations])

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId]
  )
  const threadMessages = selectedId ? messagesMap[selectedId] ?? [] : []

  const send = (body: string) => {
    if (!selectedId) return
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      conversationId: selectedId,
      from: "me",
      body,
      sentAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }
    setMessagesMap((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newMsg],
    }))
    setConversations((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, lastMessage: body, lastAt: "now", unread: 0 } : c))
    )
  }

  return (
    <div className="bg-background">
      <Header />
      <main className="pt-12 pb-16">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20 xl:px-24">
          <header className="mb-6">
            <p className="text-xs tracking-widest text-brand-orange uppercase">Inbox</p>
            <h1 className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              Messages
            </h1>
          </header>

          <div className="grid h-[calc(100vh-220px)] min-h-[600px] gap-4 lg:grid-cols-[320px_1fr]">
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            {selected ? (
              <MessageThread
                conversation={selected}
                messages={threadMessages}
                composer={<MessageComposer onSend={send} />}
              />
            ) : (
              <EmptyState
                icon={Mail01Icon}
                title="Select a conversation"
                description="Pick a thread on the left to read and reply."
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
