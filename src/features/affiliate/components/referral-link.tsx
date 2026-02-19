import { Copy, Users } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ReferralLinkProps {
  referralCode?: string
  isLoading?: boolean
}

export function ReferralLink({
  referralCode = 'satnaing',
  isLoading = false,
}: ReferralLinkProps) {
  const referralUrl = `https://supersumo.id/ref/${referralCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      toast.success('Referral link copied to clipboard')
    } catch (_error) {
      toast.error('Failed to copy referral link')
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Users className='h-5 w-5 text-orange-500' />
            <CardTitle>Referral Link</CardTitle>
          </div>
          <CardDescription>
            Share this link to earn 10% commission on every referral payment.
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='flex items-center space-x-2'>
            <div className='flex-1 rounded-md border bg-muted p-3 font-mono text-sm'>
              Loading...
            </div>
            <Button size='icon' variant='outline' disabled>
              <Copy className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Users className='h-5 w-5 text-orange-500' />
          <CardTitle>Referral Link</CardTitle>
        </div>
        <CardDescription>
          Share this link to earn 10% commission on every referral payment.
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='flex items-center space-x-2'>
          <div className='flex-1 rounded-md border bg-muted p-3 font-mono text-sm'>
            {referralUrl}
          </div>
          <Button size='icon' variant='outline' onClick={handleCopy}>
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
