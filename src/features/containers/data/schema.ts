import { z } from 'zod'

export const containerSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.enum(['active', 'inactive', 'pending']),
  plan: z.string(),
  price: z.string(),
  autoRenewal: z.boolean(),
  expiry: z.string(),
  daysLeft: z.string(),
})

export type Container = z.infer<typeof containerSchema>
