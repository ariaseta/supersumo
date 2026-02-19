import { createFileRoute } from '@tanstack/react-router'
import { ContainerDetails } from '@/features/containers/details'

export const Route = createFileRoute('/_authenticated/containers/$containerId')(
  {
    component: ContainerDetails,
  }
)
