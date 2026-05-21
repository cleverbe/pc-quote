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
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run typecheck  # Type-check without building
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run preview    # Preview production build
```

## Pre-commit Hooks

On every commit, Husky runs **lint-staged** — ESLint + Prettier on staged files.

## Project Structure

```
src/
├── components/ui/   # shadcn/ui components
├── lib/             # Utilities and store context
├── routes/          # TanStack Router file-based routes
├── types/           # TypeScript interfaces
├── index.css        # Tailwind imports and theme tokens
└── main.tsx         # App entry point
```
