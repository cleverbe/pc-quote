import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Package, Tags } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

const navItems = [
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/products', label: 'Products', icon: Package },
] as const

function AdminLayout() {
  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <aside className="bg-muted/30 w-56 border-r p-4">
        <h2 className="text-muted-foreground mb-4 px-2 text-sm font-semibold">
          Admin
        </h2>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="hover:bg-accent [&.active]:bg-accent flex items-center gap-2 rounded-md px-2 py-1.5 text-sm [&.active]:font-medium"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
