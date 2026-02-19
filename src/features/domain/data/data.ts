import { type Domain } from './schema'

export const domains: Domain[] = [
  {
    id: 'dom-1234',
    domain: 'supersumo.id',
    status: 'active',
    expiry: '2025-02-14',
    autoRenew: true,
  },
  {
    id: 'dom-5678',
    domain: 'myproject.com',
    status: 'expired',
    expiry: '2024-01-10',
    autoRenew: false,
  },
  {
    id: 'dom-9012',
    domain: 'cool-app.net',
    status: 'pending',
    expiry: '2025-05-20',
    autoRenew: true,
  },
  {
    id: 'dom-3456',
    domain: 'awesomeapp.io',
    status: 'active',
    expiry: '2025-08-15',
    autoRenew: true,
  },
  {
    id: 'dom-7890',
    domain: 'testwebsite.org',
    status: 'expired',
    expiry: '2024-03-01',
    autoRenew: false,
  },
]

export const statuses = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'expired',
    label: 'Expired',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
]
