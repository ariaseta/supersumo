import {
  LayoutDashboard,
  Sparkles,
  Package,
  Server,
  Globe,
  Database,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaing@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'SuperSumo',
      logo: Command,
      plan: 'PaaS Platform',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Services',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'AI',
          url: '/ai',
          icon: Sparkles,
        },
        {
          title: 'Containers',
          url: '/containers',
          icon: Package,
        },
        {
          title: 'VPS',
          url: '/vps',
          icon: Server,
        },
        {
          title: 'Domain',
          url: '/domain',
          icon: Globe,
        },
        {
          title: 'Database',
          url: '/database',
          icon: Database,
        },
      ],
    },
    {
      title: 'Setting',
      items: [
        {
          title: 'Billing',
          url: '/billing',
          icon: CreditCard,
        },
        {
          title: 'Affiliate',
          url: '/affiliate',
          icon: Users,
        },
        {
          title: 'Setting',
          url: '/settings',
          icon: Settings,
        },
        {
          title: 'Support',
          url: '/support',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
