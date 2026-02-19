import { z } from 'zod'

export const domainSchema = z.object({
  id: z.string(),
  domain: z.string(),
  status: z.enum(['active', 'expired', 'pending']),
  expiry: z.string(),
  autoRenew: z.boolean(),
})

export type Domain = z.infer<typeof domainSchema>
