import { db, conversations } from '@/db'

export const createConversation = async (
  title: string,
  createdAt?: number,
  updatedAt?: number
) => {
  await db
    .insert(conversations)
    .values({
      title,
      createdAt: createdAt || Date.now(),
      updatedAt: updatedAt || Date.now(),
    })
    .execute()
}
