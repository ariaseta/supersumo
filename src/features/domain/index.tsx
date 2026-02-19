import { useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { DomainList } from './components/domain-list'
import { domains } from './data/data'

export function Domain() {
  const navigate = useNavigate()
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <Notifications />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='gap-4'>
        <PageHeader
          title='Domain Management'
          description='Register and manage your domains and DNS records'
          className='mb-2'
          actions={
            <Button onClick={() => navigate({ to: '/domain/create' })}>
              <Plus className='mr-2 h-4 w-4' />
              Add Domain
            </Button>
          }
        />

        <DomainList data={domains} />
      </Main>
    </>
  )
}
