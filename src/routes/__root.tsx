import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'sonner'
import { MonitorSmartphone, Store } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <MonitorSmartphone className="size-5" />
            PC Quote
          </Link>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            <Link to="/" className="[&.active]:font-medium">
              Home
            </Link>
            <Link to="/admin" className="[&.active]:font-medium">
              <Store className="mr-1 inline size-4" />
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <Toaster richColors position="bottom-right" />
      <TanStackRouterDevtools />
    </>
  ),
})
