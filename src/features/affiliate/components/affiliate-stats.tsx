import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AffiliateStatsProps {
  earnings?: number
  totalReferrals?: number
  conversionRate?: number
  isLoading?: boolean
}

export function AffiliateStats({
  earnings = 0,
  totalReferrals = 0,
  conversionRate = 0,
  isLoading = false,
}: AffiliateStatsProps) {
  const currency = import.meta.env.VITE_CURRENCY || 'Rp'

  if (isLoading) {
    return (
      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='pb-3'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='mt-3 h-8 w-32' />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='mt-3 h-8 w-16' />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='mt-3 h-8 w-16' />
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            Earnings
          </CardTitle>
          <div className='mt-3 text-2xl font-bold'>
            {currency} {earnings.toLocaleString()}
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            Total Referrals
          </CardTitle>
          <div className='mt-3 text-2xl font-bold'>{totalReferrals}</div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            Conversion Rate
          </CardTitle>
          <div className='mt-3 text-2xl font-bold'>{conversionRate}%</div>
        </CardHeader>
      </Card>
    </div>
  )
}
