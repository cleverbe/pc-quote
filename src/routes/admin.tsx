import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Package, Tags, LayoutDashboard, FileText } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

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
    <div className="flex min-h-[calc(100vh-57px)]">
      <aside className="w-56 border-r p-4">
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
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
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
