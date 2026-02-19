import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { SupportContent } from './components/support-content'

export function Support() {
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
          title='Support'
          description='Get help and support for your SumoPod services'
          className='mb-2'
        />
        <div className='mt-0 w-full max-w-5xl'>
          <SupportContent />
        </div>
      </Main>
    </>
  )
}
