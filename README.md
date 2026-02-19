# SuperSumo

A modern PaaS (Platform as a Service) Admin Dashboard built with React 19, TypeScript, and Vite. Provides comprehensive management for cloud services including VPS, Containers, Databases, Domains, and more.

Built with responsiveness, accessibility, and type safety in mind.

## Features

- Light/dark mode
- Responsive
- Accessible
- With built-in Sidebar component
- Global search command
- 10+ pages
- Extra custom components
- RTL support

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `src/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Auth:** [Supabase](https://supabase.com) (OAuth with Google & GitHub)

## Run Locally

Clone the project

```bash
  git clone https://github.com/ariaseta/supersumo.git
```

Go to the project directory

```bash
  cd supersumo
```

Install dependencies

```bash
  bun install
```

Configure Supabase

```bash
  cp .env.example .env
```

Then open `.env` and add your Supabase credentials:
- `VITE_SUPABASE_URL`: Your Supabase project URL from https://app.supabase.com
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key from Project Settings → API

Without these credentials, `bun dev` will fail with a clear error message.

Start the development server

```bash
  bun dev
```

## Build for Production

```bash
  bun run build
```

## Code Quality

```bash
  bun lint        # Check ESLint
  bun format      # Fix formatting with Prettier
  bun knip        # Find unused files and dependencies
```

## Project Structure

The project follows a feature-based architecture:

```
src/
├── features/          # Business feature modules (VPS, Databases, Domains, etc.)
├── components/        # Shared UI components
├── routes/            # TanStack Router file-based routing
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── stores/            # Zustand state management
└── lib/               # Utility functions and Supabase client
```

For detailed architecture information, see [claude.md](./claude.md).

## Author

Maintained by [@ariaseta](https://github.com/ariaseta)

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
