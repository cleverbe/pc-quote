import { useState } from 'react'
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Package, Tags, LayoutDashboard, FileText, Menu, X } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { to: '/admin', label: t('admin.sidebar.overview'), icon: LayoutDashboard },
    {
      to: '/admin/categories',
      label: t('admin.sidebar.categories'),
      icon: Tags,
    },
    {
      to: '/admin/products',
      label: t('admin.sidebar.products'),
      icon: Package,
    },
    { to: '/admin/quotes', label: t('admin.sidebar.quotes'), icon: FileText },
  ]

  return (
    <div className="flex min-h-0 flex-1">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`text-muted-foreground hover:text-foreground fixed top-14 left-1 z-50 mt-2 flex size-8 items-center justify-center rounded-md md:hidden ${open ? 'hidden' : ''}`}
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`bg-card fixed inset-y-0 top-14 left-0 z-40 w-56 -translate-x-full border-r shadow-lg transition-transform md:static md:translate-x-0 md:shadow-none ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
          <span className="text-sm font-semibold">Admin</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground flex size-7 items-center justify-center rounded-md"
          >
            <X className="size-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 p-4">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-6 pt-14 md:pt-6">
        <Outlet />
      </main>
    </div>
  )
}
