import { createFileRoute } from '@tanstack/react-router'
import { DatabaseDetails } from '@/features/database/details'

export const Route = createFileRoute('/_authenticated/database/$databaseId')({
  component: DatabaseDetails,
})
