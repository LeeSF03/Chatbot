import { create } from 'zustand'

type Conversation = {
  id: number
  title: string
  createdAt: number
  updatedAt: number
}
type ConversationStore = {
  conversations: Conversation[]
  addConversation: (conversation: Conversation[]) => void
  removeConversation: (id: number) => void
  setConversations: (conversation: Conversation[]) => void
}

export const useConversationStore = create<ConversationStore>()((set) => ({
  conversations: [],
  addConversation: (conversation: Conversation[]) =>
    set((state) => ({
      conversations: [...conversation, ...state.conversations],
    })),
  removeConversation: (id: number) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
    })),
  setConversations: (conversation: Conversation[]) =>
    set({ conversations: conversation }),
}))
