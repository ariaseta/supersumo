import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Domain } from '@/features/domain'

const domainSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.enum(['active', 'expired', 'pending']))
    .optional()
    .catch([]),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/domain/')({
  component: Domain,
  validateSearch: domainSearchSchema,
})
