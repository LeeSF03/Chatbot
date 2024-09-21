import { index, sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

// TODO: Delete this example table
export const conversationSchema = sqliteTable(
  'conversations',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => ({
    id_idx: index('id_index').on(table.id),
  })
)
