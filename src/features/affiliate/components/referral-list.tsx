import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface Referral {
  id: string
  user: string
  date: string
  status: 'paid' | 'pending' | 'cancelled'
  amount: number
}

interface ReferralListProps {
  referrals?: Referral[]
  isLoading?: boolean
}

export function ReferralList({
  referrals = [],
  isLoading = false,
}: ReferralListProps) {
  const currency = import.meta.env.VITE_CURRENCY || 'Rp'

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
          <CardDescription>
            A list of users who signed up through your link.
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='overflow-x-auto rounded-md border p-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='px-4 py-3'>User</TableHead>
                  <TableHead className='px-4 py-3'>Date</TableHead>
                  <TableHead className='px-4 py-3'>Status</TableHead>
                  <TableHead className='px-4 py-3 text-right'>
                    Commission
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((i) => (
                  <TableRow key={i}>
                    <TableCell className='px-4 py-3'>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell className='px-4 py-3'>
                      <Skeleton className='h-4 w-20' />
                    </TableCell>
                    <TableCell className='px-4 py-3'>
                      <Skeleton className='h-6 w-16' />
                    </TableCell>
                    <TableCell className='px-4 py-3 text-right'>
                      <Skeleton className='ml-auto h-4 w-20' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>
          A list of users who signed up through your link.
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='overflow-x-auto rounded-md border p-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='px-4 py-3'>User</TableHead>
                <TableHead className='px-4 py-3'>Date</TableHead>
                <TableHead className='px-4 py-3'>Status</TableHead>
                <TableHead className='px-4 py-3 text-right'>
                  Commission
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 px-4 py-3 text-center text-muted-foreground'
                  >
                    No referrals yet. Start sharing your link!
                  </TableCell>
                </TableRow>
              ) : (
                referrals.map((ref) => (
                  <TableRow key={ref.id}>
                    <TableCell className='px-4 py-3 font-medium'>
                      {ref.user}
                    </TableCell>
                    <TableCell className='px-4 py-3'>{ref.date}</TableCell>
                    <TableCell className='px-4 py-3'>
                      <Badge
                        variant={
                          ref.status === 'paid'
                            ? 'default'
                            : ref.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {ref.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='px-4 py-3 text-right font-medium'>
                      {currency} {ref.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
