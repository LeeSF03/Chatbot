import { create } from 'zustand'

type NewChatModalStore = {
  isOpen: boolean
  closeModal: () => void
  openModal: () => void
}

export const useNewChatModalStore = create<NewChatModalStore>()((set) => ({
  isOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}))
