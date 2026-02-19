import { useNavigate } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Domain } from '../data/schema'

export const domainColumns: ColumnDef<Domain>[] = [
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
    accessorKey: 'domain',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
        className='[&>button]:pl-0'
      />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-2/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      const NameCell = () => {
        const navigate = useNavigate()
        const domain = row.getValue('domain') as string
        return (
          <button
            onClick={() =>
              navigate({
                to: '/domain/$domainId',
                params: { domainId: row.original.id },
              })
            }
            className='truncate text-left font-medium hover:underline'
          >
            {domain}
          </button>
        )
      }

      return <NameCell />
    },
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
                : status === 'pending'
                  ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400'
                  : 'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-400'
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
    accessorKey: 'expiry',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expiry' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const expiry = row.getValue('expiry') as string
      return (
        <div className='flex flex-col'>
          <span className='text-sm'>Expires {expiry}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'autoRenew',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Auto Renew' />
    ),
    meta: { className: 'text-center', tdClassName: 'text-center' },
    cell: ({ row }) => {
      const autoRenew = row.getValue('autoRenew') as boolean
      return (
        <div className='flex items-center justify-center'>
          <Switch checked={autoRenew} />
        </div>
      )
    },
    enableSorting: false,
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
                to: '/domain/$domainId',
                params: { domainId: row.original.id },
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
