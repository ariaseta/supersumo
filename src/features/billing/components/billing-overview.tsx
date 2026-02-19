import { Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function BillingOverview() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Current Credits</CardTitle>
          <Wallet className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {import.meta.env.VITE_CURRENCY || 'Rp'} 9.000
          </div>
          <p className='text-xs text-muted-foreground'>Available for use</p>
        </CardContent>
      </Card>
    </div>
  )
}
