# PC Quote

Admin dashboard for building and quoting custom computer configurations. Built with React + TypeScript + Vite.

## Tech Stack

- **Framework:** React 19 + TypeScript 6
- **Bundler:** Vite 8
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Icons:** Lucide React
- **Notifications:** sonner
- **Linting:** ESLint 10
- **Formatting:** Prettier

## Getting Started

### Local

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm typecheck     # Type-check without building
pnpm lint          # Run ESLint
pnpm format        # Format code with Prettier
pnpm preview       # Preview production build
```

### Docker

```bash
docker compose up -d          # Start dev server in container (http://localhost:5173)
docker compose up -d --build  # Rebuild and restart after config changes
docker compose down           # Stop containers
docker compose logs -f        # Follow logs
```

The dev server inside the container listens on `0.0.0.0:5173` (configured in `vite.config.ts`).

## Pre-commit Hooks

On every commit, Husky runs **lint-staged** — ESLint + Prettier on staged files.

## Project Structure

```
src/
├── components/
│   ├── admin/       # Admin page components (tables, dialogs)
│   ├── build/       # Build page components (filters, cards, sidebar)
│   └── ui/          # shadcn/ui primitives
├── context/         # React context definitions
├── hooks/           # Custom hooks (use-store)
├── lib/             # Utilities (print-quote, cn)
├── routes/          # TanStack Router file-based routes
├── stores/          # StoreProvider with seed data
├── types/           # TypeScript interfaces
├── index.css        # Tailwind imports and theme tokens
└── main.tsx         # App entry point
```
