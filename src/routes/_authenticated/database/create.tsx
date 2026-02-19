import { createFileRoute } from '@tanstack/react-router'
import { CreateDatabase } from '@/features/database/create'

export const Route = createFileRoute('/_authenticated/database/create')({
  component: CreateDatabase,
})
