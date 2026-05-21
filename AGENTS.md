# AGENTS

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (typecheck then bundle)
- `npm run generate` — Regenerate `src/routeTree.gen.ts` after adding/moving route files
- `npm run typecheck` — `tsc -b --noEmit`
- `npm run lint` — ESLint on all files
- `npm run format` — Prettier on `src/**/*.{ts,tsx,css,json}`
- `npm run prepare` — Husky install (runs automatically on `npm install`)

Pre-commit: Husky runs `lint-staged` → `eslint --fix` + `prettier --write` on staged `.ts,.tsx` files.

## Architecture

Single-entry Vite SPA (`index.html` → `src/main.tsx` → `<StoreProvider><RouterProvider/>`).

**State**: In-memory React context (`StoreProvider` in `src/stores/StoreProvider.tsx` + `useStore` hook in `src/hooks/use-store.ts`). Categories and products are initialized with seed data on every page load. No persistence.

**Routing**: TanStack Router v1 with `autoCodeSplitting: true` (each route file → separate chunk). Route tree is auto-generated at `src/routeTree.gen.ts` — **never edit manually**. After adding a new route file under `src/routes/`, run `npm run generate` to update the tree.

**Route naming convention**: Flat files with dots for nesting. `admin.products.tsx` → `/admin/products`. `admin.index.tsx` → `/admin/`. See `routeTree.gen.ts` for the full mapping.

## Design System

See `.interface-design/system.md` for the full design system. Key points:

- **Palette:** Cool steel blue (220° hue), cyan accent (195°)
- **Depth:** Borders-only, no shadows
- **Tables:** `bg-card` container with `border-b` header, no outer card wrapper
- **Delete:** Confirm-on-delete two-click pattern
- **Compact controls:** `h-8` inputs, `text-xs` default, `size-7` pagination

## Conventions

- `@/` path alias → `src/`
- `cn()` from `@/lib/utils` for Tailwind class merging (clsx + tailwind-merge)
- shadcn/ui components go in `src/components/ui/`, follow the pattern in `button.tsx` (CVA variants + cn)
- App components go in `src/components/build/` and `src/components/admin/`
- Context in `src/context/`, hooks in `src/hooks/`, stores in `src/stores/`, types in `src/types/`
- Tailwind CSS v4: configure theme tokens in `src/index.css` using `@theme {}` block, not `tailwind.config.*`
- Route files export `const Route = createFileRoute('/path')({ component: ... })` — this is the TanStack Router v1 file-route pattern
- React 19, TypeScript 6. `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUnusedLocals` and `noUnusedParameters` are strict — unused variables fail the build
- `src/routeTree.gen.ts` is excluded from ESLint (`globalIgnores`) and Prettier (`.prettierignore`)
- react-refresh ESLint rule is set to `warn` (not error) with `allowConstantExport` + `allowExportNames: ['Route']` — this is expected noise

## Types

```
src/types/index.ts
  Category { id, name, description, createdAt }
  Product  { id, name, description, price, categoryId, createdAt }
```

## Store API

`useStore()` returns:

- `categories`, `products` — arrays
- `addCategory(name, description)`, `updateCategory(id, name, desc)`, `deleteCategory(id)`
- `addProduct(name, desc, price, catId)`, `updateProduct(id, name, desc, price, catId)`, `deleteProduct(id)`
- `getCategoryName(id)` → string, `getProductsByCategory(catId)` → Product[]

## Current routes

| File                              | Path                                              |
| --------------------------------- | ------------------------------------------------- |
| `src/routes/__root.tsx`           | root layout (header + `<Outlet/>` + `<Toaster/>`) |
| `src/routes/index.tsx`            | `/`                                               |
| `src/routes/admin.tsx`            | `/admin` layout (sidebar)                         |
| `src/routes/admin.index.tsx`      | `/admin/`                                         |
| `src/routes/admin.categories.tsx` | `/admin/categories`                               |
| `src/routes/admin.products.tsx`   | `/admin/products`                                 |
| `src/routes/build.tsx`            | `/build`                                          |

## Quirks / gotchas

- No test runner installed. No CI. No Docker.
- `tsc -b` uses project references (`tsconfig.app.json` + `tsconfig.node.json`). If you add a new tsconfig, register it in the root `tsconfig.json` references array.
- The app is entirely client-side. No API calls, no backend. All data lives in React state and resets on refresh.
- Seed data is defined inline in `src/stores/StoreProvider.tsx` as `initialCategories[]` and `initialProducts[]`.
