import { Table } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Domain } from '../data/schema'

interface DataTableBulkActionsProps {
  table: Table<Domain>
}

export function DataTableBulkActions({ table }: DataTableBulkActionsProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  if (selectedRows.length === 0) {
    return null
  }

  return (
    <div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md border bg-background p-2 shadow-lg'>
      <span className='text-sm text-muted-foreground'>
        {selectedRows.length} of {table.getFilteredRowModel().rows.length}{' '}
        row(s) selected.
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='sm'>
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
          <DropdownMenuItem>Renew Selected</DropdownMenuItem>
          <DropdownMenuItem>Enable Auto-Renew</DropdownMenuItem>
          <DropdownMenuItem>Disable Auto-Renew</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-red-600'>
            <Trash2 className='mr-2 h-4 w-4' /> Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
