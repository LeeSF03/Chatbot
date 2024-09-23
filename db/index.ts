import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite/next'

export const expo = openDatabaseSync('chatbot.db')
export const db = drizzle(expo)

export * from './schema'
