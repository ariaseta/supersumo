import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: [
    'src/main.tsx',
    'src/routes/**/*.tsx',
    'src/context/**/*.tsx',
    'src/components/**/*.tsx',
    'src/features/**/*.tsx',
  ],
  project: [
    'src/**/*.{ts,tsx}',
    'index.html',
  ],
  ignore: [
    'src/components/ui/**',
    'src/routeTree.gen.ts',
    'src/tanstack-table.d.ts',
    'src/vite-env.d.ts',
    'src/assets/**',
    'src/components/coming-soon.tsx',
    'src/components/learn-more.tsx',
    'src/components/long-text.tsx',
    'src/components/password-input.tsx',
    'src/components/select-dropdown.tsx',
    'src/components/layout/**',
    'src/lib/supabase/**',
    'src/features/**/data/**',
    'src/features/**/components/**',
  ],
  ignoreDependencies: [
    'tw-animate-css', // Used in CSS imports, knip can't detect
  ],
}

export default config