import { z } from 'zod'

export const databaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.enum(['running', 'stopped', 'pending']),
  region: z.string(),
  size: z.string(),
  autoRenew: z.boolean(),
})

export type Database = z.infer<typeof databaseSchema>
