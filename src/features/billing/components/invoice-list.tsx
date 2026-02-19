import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const invoices = [
  {
    id: 'INV-001',
    date: '2024-01-31',
    amount: '$350.00',
    status: 'paid',
  },
  {
    id: 'INV-002',
    date: '2023-12-31',
    amount: '$320.00',
    status: 'paid',
  },
  {
    id: 'INV-003',
    date: '2023-11-30',
    amount: '$300.00',
    status: 'paid',
  },
  {
    id: 'INV-004',
    date: '2023-10-31',
    amount: '$280.00',
    status: 'paid',
  },
]

export function InvoiceList() {
  return (
    <div className='overflow-x-auto rounded-lg border p-4'>
      <Table className='min-w-xl'>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className='font-medium'>{invoice.id}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant='outline' className='capitalize'>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='sm'>
                  <Download className='mr-2 h-4 w-4' />
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
