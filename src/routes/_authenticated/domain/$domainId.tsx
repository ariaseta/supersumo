import { createFileRoute } from '@tanstack/react-router'
import { DomainDetails } from '@/features/domain/details'

export const Route = createFileRoute('/_authenticated/domain/$domainId')({
  component: DomainDetails,
})
