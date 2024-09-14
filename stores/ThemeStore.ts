import { create } from 'zustand'
import { StateStorage, persist, createJSONStorage } from 'zustand/middleware'
import { kvStorage } from '@/storages'

type Theme = 'light' | 'dark'
type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const themeStorage: StateStorage = {
  getItem: async (name: string) => {
    const theme = await kvStorage.getString(name)
    return (theme as Theme) ?? null
  },
  setItem: async (name: string, theme: string) => {
    return kvStorage.set(name, theme)
  },
  removeItem: async (name: string) => {
    await kvStorage.delete(name)
  },
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark' as Theme,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => themeStorage),
    }
  )
)
