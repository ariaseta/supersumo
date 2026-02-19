import { ArrowDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const transactions = [
  {
    id: 'TXN-001',
    date: '2/9/2026',
    description: 'Purchase VPS - test-aapanel',
    type: 'Usage',
    amount: '-48.000',
  },
  {
    id: 'TXN-002',
    date: '2/9/2026',
    description: 'Purchase VPS - tes-linux',
    type: 'Usage',
    amount: '-60.000',
  },
  {
    id: 'TXN-003',
    date: '2/9/2026',
    description: 'Upgrade VPS - tes-windows',
    type: 'Usage',
    amount: '-28.000',
  },
  {
    id: 'TXN-004',
    date: '2/9/2026',
    description: 'Upgrade VPS - tes-windows',
    type: 'Usage',
    amount: '-28.000',
  },
  {
    id: 'TXN-005',
    date: '2/9/2026',
    description: 'Purchase VPS - tes-windows',
    type: 'Usage',
    amount: '-90.000',
  },
  {
    id: 'TXN-006',
    date: '2/7/2026',
    description: 'Upgrade VPS - openclaw 2',
    type: 'Usage',
    amount: '-18.900',
  },
]

export function TransactionList() {
  return (
    <div className='overflow-x-auto rounded-lg border p-4'>
      <Table className='min-w-xl'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className='font-medium'>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant='outline' className='font-normal text-red-500'>
                  <ArrowDown className='mr-1 h-3 w-3' />
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className='text-right font-medium text-red-500'>
                {transaction.amount}{' '}
                <span className='text-xs font-normal text-muted-foreground'>
                  credits
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
