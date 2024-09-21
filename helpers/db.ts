import { db, conversationSchema } from '@/db'

export const createConversation = async (
  title: string,
  createdAt?: number,
  updatedAt?: number
) => {
  const data = await db
    .insert(conversationSchema)
    .values({
      title,
      createdAt: createdAt || Date.now(),
      updatedAt: updatedAt || Date.now(),
    })
    .returning()
    .execute()

  return data
}
