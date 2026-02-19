import { useQuery } from '@tanstack/react-query'
import { type Referral } from '../components/referral-list'

interface AffiliateStats {
  earnings: number
  totalReferrals: number
  conversionRate: number
}

interface AffiliateData {
  stats: AffiliateStats
  referrals: Referral[]
  referralCode: string
}

async function fetchAffiliateData(): Promise<AffiliateData> {
  // TODO: Replace with actual API call
  // const response = await api.get('/affiliate')
  // return response.data

  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          earnings: 75000,
          totalReferrals: 5,
          conversionRate: 12.5,
        },
        referrals: [
          {
            id: 'ref-1',
            user: 'john_doe',
            date: '2024-02-10',
            status: 'paid',
            amount: 50000,
          },
          {
            id: 'ref-2',
            user: 'jane_smith',
            date: '2024-02-12',
            status: 'pending',
            amount: 25000,
          },
          {
            id: 'ref-3',
            user: 'mike_wilson',
            date: '2024-02-08',
            status: 'paid',
            amount: 35000,
          },
          {
            id: 'ref-4',
            user: 'sarah_jones',
            date: '2024-02-05',
            status: 'cancelled',
            amount: 0,
          },
          {
            id: 'ref-5',
            user: 'alex_brown',
            date: '2024-02-01',
            status: 'paid',
            amount: 40000,
          },
        ],
        referralCode: 'satnaing',
      })
    }, 500)
  })
}

export function useAffiliateData() {
  return useQuery({
    queryKey: ['affiliate'],
    queryFn: fetchAffiliateData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
