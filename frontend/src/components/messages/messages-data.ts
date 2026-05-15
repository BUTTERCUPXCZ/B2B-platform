export type ParticipantRole = "client" | "contractor" | "seller" | "company"

export type Conversation = {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  participantRole: ParticipantRole
  lastMessage: string
  lastAt: string
  unread: number
  relatedProjectId?: string
  relatedJobId?: string
}

export type Message = {
  id: string
  conversationId: string
  from: "me" | "them"
  body: string
  sentAt: string
}

export const conversations: Conversation[] = [
  {
    id: "c-001",
    participantId: "studio-manille",
    participantName: "Studio Manille",
    participantAvatar:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=200&q=80&auto=format&fit=crop",
    participantRole: "company",
    lastMessage: "We can drop off cabinet samples on Friday.",
    lastAt: "11:42",
    unread: 2,
    relatedProjectId: "PRJ-2026-001",
  },
  {
    id: "c-002",
    participantId: "stormshield-roofing",
    participantName: "Stormshield Roofing",
    participantAvatar:
      "https://images.unsplash.com/photo-1632759145355-8b8f1f4f5c0c?w=200&q=80&auto=format&fit=crop",
    participantRole: "contractor",
    lastMessage: "Steel install starts tomorrow at 7am.",
    lastAt: "Yesterday",
    unread: 0,
    relatedProjectId: "PRJ-2026-002",
  },
  {
    id: "c-003",
    participantId: "eagle-materials",
    participantName: "Eagle Materials",
    participantAvatar:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&q=80&auto=format&fit=crop",
    participantRole: "seller",
    lastMessage: "Order KSK-00012398 shipped.",
    lastAt: "Mon",
    unread: 0,
  },
  {
    id: "c-004",
    participantId: "aquaflow-plumbing",
    participantName: "AquaFlow Plumbing",
    participantAvatar:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&q=80&auto=format&fit=crop",
    participantRole: "contractor",
    lastMessage: "Quote attached. Available Wed AM.",
    lastAt: "Sun",
    unread: 1,
    relatedJobId: "j-003",
  },
]

export const messagesByConversation: Record<string, Message[]> = {
  "c-001": [
    {
      id: "m1",
      conversationId: "c-001",
      from: "them",
      body: "Hi! Just confirming the kitchen scope — are you keeping the existing flooring?",
      sentAt: "10:14",
    },
    {
      id: "m2",
      conversationId: "c-001",
      from: "me",
      body: "Yes, but we want the tile retiled in the wet zone.",
      sentAt: "10:32",
    },
    {
      id: "m3",
      conversationId: "c-001",
      from: "them",
      body: "Perfect. We'll bring 3 tile samples to the consult.",
      sentAt: "10:34",
    },
    {
      id: "m4",
      conversationId: "c-001",
      from: "them",
      body: "We can drop off cabinet samples on Friday.",
      sentAt: "11:42",
    },
  ],
  "c-002": [
    {
      id: "m1",
      conversationId: "c-002",
      from: "them",
      body: "Frame done, underlayment installed. Ready to start steel.",
      sentAt: "Yesterday 16:20",
    },
    {
      id: "m2",
      conversationId: "c-002",
      from: "me",
      body: "Great. Daily photos please as usual.",
      sentAt: "Yesterday 17:01",
    },
    {
      id: "m3",
      conversationId: "c-002",
      from: "them",
      body: "Steel install starts tomorrow at 7am.",
      sentAt: "Yesterday 18:30",
    },
  ],
  "c-003": [
    {
      id: "m1",
      conversationId: "c-003",
      from: "them",
      body: "Order KSK-00012398 shipped.",
      sentAt: "Mon 09:01",
    },
  ],
  "c-004": [
    {
      id: "m1",
      conversationId: "c-004",
      from: "me",
      body: "Hi, can you look at a leak in our master bath?",
      sentAt: "Sun 12:00",
    },
    {
      id: "m2",
      conversationId: "c-004",
      from: "them",
      body: "Quote attached. Available Wed AM.",
      sentAt: "Sun 13:22",
    },
  ],
}
