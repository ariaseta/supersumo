import { Box } from 'lucide-react'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
// import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-2 py-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white'>
            <Box className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>SuperSumo</span>
            <span className='truncate text-xs'>PaaS Platform</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => {
          const filteredItems = group.items.filter((item) => {
            const featureKey = `VITE_ENABLE_${item.title.toUpperCase()}`
            return import.meta.env[featureKey] !== 'false'
          })

          if (filteredItems.length === 0) return null

          return (
            <NavGroup
              key={group.title}
              title={group.title}
              items={filteredItems}
            />
          )
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
