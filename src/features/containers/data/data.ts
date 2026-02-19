import { type Container } from './schema'

export const containers: Container[] = [
  {
    id: 'cont-1234',
    name: 'saas-billing',
    type: 'n8n Basic',
    status: 'active',
    plan: 'Monthly',
    price: 'Rp 15.000',
    autoRenewal: true,
    expiry: '02/03/2026',
    daysLeft: '16 days left',
  },
  {
    id: 'cont-5678',
    name: 'wa-amm',
    type: 'WAHA Plus Cloud (512) - NOWEB',
    status: 'active',
    plan: 'Monthly',
    price: 'Rp 35.000',
    autoRenewal: true,
    expiry: '13/11/2026',
    daysLeft: '272 days left',
  },
  {
    id: 'cont-9012',
    name: 'web-server-01',
    type: 'nginx:latest',
    status: 'active',
    plan: 'Basic',
    price: 'Rp 25.000',
    autoRenewal: true,
    expiry: '15/06/2026',
    daysLeft: '120 days left',
  },
  {
    id: 'cont-3456',
    name: 'db-redis',
    type: 'redis:alpine',
    status: 'inactive',
    plan: 'Standard',
    price: 'Rp 45.000',
    autoRenewal: false,
    expiry: '01/02/2026',
    daysLeft: 'expired',
  },
  {
    id: 'cont-7890',
    name: 'worker-node',
    type: 'node:18-alpine',
    status: 'pending',
    plan: 'Basic',
    price: 'Rp 20.000',
    autoRenewal: true,
    expiry: '20/08/2026',
    daysLeft: '185 days left',
  },
  {
    id: 'cont-1111',
    name: 'api-gateway',
    type: 'kong:latest',
    status: 'active',
    plan: 'Premium',
    price: 'Rp 75.000',
    autoRenewal: true,
    expiry: '30/09/2026',
    daysLeft: '225 days left',
  },
  {
    id: 'cont-2222',
    name: 'cache-memcached',
    type: 'memcached:alpine',
    status: 'active',
    plan: 'Basic',
    price: 'Rp 15.000',
    autoRenewal: false,
    expiry: '10/04/2026',
    daysLeft: '54 days left',
  },
  {
    id: 'cont-3333',
    name: 'queue-rabbitmq',
    type: 'rabbitmq:3-management',
    status: 'inactive',
    plan: 'Standard',
    price: 'Rp 55.000',
    autoRenewal: true,
    expiry: '05/01/2026',
    daysLeft: 'expired',
  },
]

export const statuses = [
  {
    value: 'active',
    label: 'Active',
    icon: null,
  },
  {
    value: 'inactive',
    label: 'Inactive',
    icon: null,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: null,
  },
]

export const plans = [
  {
    value: 'Basic',
    label: 'Basic',
  },
  {
    value: 'Standard',
    label: 'Standard',
  },
  {
    value: 'Premium',
    label: 'Premium',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
]
