import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

export function Settings() {
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
          title='Settings'
          description='Manage your account settings and preferences'
          className='mb-2'
        />
        <div className='mt-0 w-full max-w-3xl'>
          <Outlet />
        </div>
      </Main>
    </>
  )
}
