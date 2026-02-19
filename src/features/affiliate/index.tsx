import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { AffiliateStats } from './components/affiliate-stats'
import { ReferralLink } from './components/referral-link'
import { ReferralList } from './components/referral-list'
import { useAffiliateData } from './hooks/use-affiliate-data'

export function Affiliate() {
  const { data, isLoading } = useAffiliateData()

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <Notifications />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='gap-4'>
        <PageHeader
          title='Affiliate Program'
          description='Earn credits by referring new users to SuperSumo'
          className='mb-2'
        />

        <div className='space-y-8'>
          <AffiliateStats
            earnings={data?.stats.earnings}
            totalReferrals={data?.stats.totalReferrals}
            conversionRate={data?.stats.conversionRate}
            isLoading={isLoading}
          />

          <div className='grid gap-6'>
            <ReferralLink
              referralCode={data?.referralCode}
              isLoading={isLoading}
            />
            <ReferralList referrals={data?.referrals} isLoading={isLoading} />
          </div>
        </div>
      </Main>
    </>
  )
}
