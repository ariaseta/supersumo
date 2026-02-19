import { useNavigate } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Container } from '../data/schema'

export const containersColumns: ColumnDef<Container>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-2/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      const NameCell = () => {
        const navigate = useNavigate()
        return (
          <button
            onClick={() =>
              navigate({
                to: '/containers/$containerId',
                params: { containerId: row.original.id },
              })
            }
            className='truncate text-left font-medium hover:underline'
          >
            {row.getValue('name')}
          </button>
        )
      }

      return <NameCell />
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => (
      <div className='text-sm text-muted-foreground'>
        {row.getValue('type')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <div className='flex w-[100px] items-center'>
          <Badge
            variant='outline'
            className={cn(
              'font-normal capitalize',
              status === 'active'
                ? 'border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-400'
                : status === 'inactive'
                  ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-400'
                  : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400'
            )}
          >
            {status}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'plan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Plan' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const plan = row.getValue('plan') as string
      const price = row.original.price
      return (
        <div className='flex w-[100px] flex-col'>
          <span className='text-sm font-medium'>{plan}</span>
          <span className='text-xs text-muted-foreground'>{price}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'autoRenewal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Auto Renewal' />
    ),
    meta: { className: 'text-center', tdClassName: 'text-center' },
    cell: ({ row }) => {
      const autoRenewal = row.getValue('autoRenewal') as boolean
      return (
        <div className='flex items-center justify-center'>
          <Switch checked={autoRenewal} />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'expiry',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expiry' />
    ),
    cell: ({ row }) => {
      const expiry = row.getValue('expiry') as string
      const daysLeft = row.original.daysLeft
      return (
        <div className='flex flex-col'>
          <span className='text-sm'>{expiry}</span>
          <span className='text-xs text-muted-foreground'>{daysLeft}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    cell: ({ row }) => {
      const ActionsCell = () => {
        const navigate = useNavigate()
        return (
          <Button
            variant='secondary'
            size='sm'
            onClick={() =>
              navigate({
                to: '/containers/$containerId',
                params: { containerId: row.original.id },
              })
            }
          >
            Manage
          </Button>
        )
      }

      return <ActionsCell />
    },
  },
]
