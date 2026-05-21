import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { MonitorSmartphone, Wrench, Store } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="bg-card border-b">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
              <MonitorSmartphone className="size-4" />
            </span>
            PC Quote
          </Link>
          <nav className="ml-auto flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="hover:bg-secondary [&.active]:bg-secondary rounded-md px-3 py-1.5 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/build"
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors"
            >
              <Wrench className="size-3.5" />
              Build
            </Link>
            <Link
              to="/admin"
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors"
            >
              <Store className="size-3.5" />
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </>
  ),
})
