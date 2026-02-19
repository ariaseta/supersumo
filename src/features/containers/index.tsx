import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ContainerList } from './components/container-list'
import { containers } from './data/data'

export function Containers() {
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
          title='Containers'
          description='Manage your docker containers and microservices'
          actions={
            <Button asChild className='bg-black text-white hover:bg-black/90'>
              <Link to='/containers/create'>
                <Plus className='mr-2 h-4 w-4' />
                Deploy Container
              </Link>
            </Button>
          }
          className='mb-2'
        />

        <ContainerList data={containers} />
      </Main>
    </>
  )
}
