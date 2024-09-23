import { db, conversationSchema, messageSchema } from '@/db'
import { eq } from 'drizzle-orm'

export const createConversation = async (title: string, updatedAt?: number) => {
  return db
    .insert(conversationSchema)
    .values({
      title,
      createdAt: Date.now(),
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

export const createMessage = async (
  message: string,
  conversationId: number,
  type: 'sent' | 'received' = 'sent'
) => {
  return db
    .insert(messageSchema)
    .values({
      message,
      conversationId,
      type,
      createdAt: Date.now(),
    })
    .returning()
    .execute()
}
