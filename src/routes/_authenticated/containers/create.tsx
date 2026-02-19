import { createFileRoute } from '@tanstack/react-router'
import { CreateContainer } from '@/features/containers/create'

export const Route = createFileRoute('/_authenticated/containers/create')({
  component: CreateContainer,
})
