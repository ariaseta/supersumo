import { createFileRoute } from '@tanstack/react-router'
import { AI } from '@/features/ai'

export const Route = createFileRoute('/_authenticated/ai/')({
  component: AI,
})
