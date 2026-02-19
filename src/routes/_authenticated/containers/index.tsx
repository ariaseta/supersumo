import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Containers } from '@/features/containers'

const containerSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.enum(['active', 'inactive', 'pending']))
    .optional()
    .catch([]),
  plan: z
    .array(z.enum(['Basic', 'Standard', 'Premium', 'Monthly']))
    .optional()
    .catch([]),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/containers/')({
  component: Containers,
  validateSearch: containerSearchSchema,
})
