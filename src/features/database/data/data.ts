import { type Database } from './schema'

export const databases: Database[] = [
  {
    id: 'db-1234',
    name: 'prod-mysql',
    type: 'MySQL 8.0',
    status: 'running',
    region: 'us-east-1',
    size: '10 GB',
    autoRenew: true,
  },
  {
    id: 'db-5678',
    name: 'staging-pg',
    type: 'PostgreSQL 15',
    status: 'stopped',
    region: 'eu-central-1',
    size: '5 GB',
    autoRenew: false,
  },
  {
    id: 'db-9012',
    name: 'cache-redis',
    type: 'Redis 7.0',
    status: 'running',
    region: 'ap-southeast-1',
    size: '1 GB',
    autoRenew: true,
  },
  {
    id: 'db-3456',
    name: 'analytics-db',
    type: 'PostgreSQL 14',
    status: 'running',
    region: 'us-west-2',
    size: '50 GB',
    autoRenew: false,
  },
  {
    id: 'db-7890',
    name: 'logs-mongodb',
    type: 'MongoDB 6.0',
    status: 'running',
    region: 'eu-west-1',
    size: '100 GB',
    autoRenew: true,
  },
  {
    id: 'db-1111',
    name: 'session-store',
    type: 'Redis 7.0',
    status: 'stopped',
    region: 'ap-northeast-1',
    size: '512 MB',
    autoRenew: false,
  },
]

export const statuses = [
  {
    value: 'running',
    label: 'Running',
  },
  {
    value: 'stopped',
    label: 'Stopped',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
]

export const regions = [
  {
    value: 'us-east-1',
    label: 'US East 1',
  },
  {
    value: 'us-west-2',
    label: 'US West 2',
  },
  {
    value: 'eu-central-1',
    label: 'EU Central 1',
  },
  {
    value: 'eu-west-1',
    label: 'EU West 1',
  },
  {
    value: 'ap-southeast-1',
    label: 'AP Southeast 1',
  },
  {
    value: 'ap-northeast-1',
    label: 'AP Northeast 1',
  },
]
