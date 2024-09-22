import { db, conversationSchema } from '@/db'
import { eq } from 'drizzle-orm'

export const createConversation = async (
  title: string,
  createdAt?: number,
  updatedAt?: number
) => {
  return db
    .insert(conversationSchema)
    .values({
      title,
      createdAt: createdAt || Date.now(),
      updatedAt: updatedAt || Date.now(),
    })
    .returning()
    .execute()
}

export const deleteConversation = async (id: number) => {
  return db
    .delete(conversationSchema)
    .where(eq(conversationSchema.id, id))
    .returning()
    .execute()
}
