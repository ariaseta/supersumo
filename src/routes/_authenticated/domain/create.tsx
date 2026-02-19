import { createFileRoute } from '@tanstack/react-router'
import { CreateDomain } from '@/features/domain/create'

export const Route = createFileRoute('/_authenticated/domain/create')({
  component: CreateDomain,
})
