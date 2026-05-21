import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/use-store'
import { Package, Tags, FileText } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { t } = useTranslation()
  const { categories, products, savedQuotes } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          {t('admin.dashboard.title')}
        </h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          {t('admin.dashboard.subtitle')}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/admin/categories" className="group block">
          <div className="bg-card hover:bg-secondary border-border rounded-lg border p-5 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t('admin.dashboard.categories')}
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {categories.length}
                </p>
              </div>
              <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <Tags className="size-4.5" />
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              {t('admin.dashboard.manageCategories')}
            </p>
          </div>
        </Link>
        <Link to="/admin/products" className="group block">
          <div className="bg-card hover:bg-secondary border-border rounded-lg border p-5 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t('admin.dashboard.products')}
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {products.length}
                </p>
              </div>
              <div className="bg-accent/10 text-accent flex size-9 items-center justify-center rounded-lg">
                <Package className="size-4.5" />
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              {t('admin.dashboard.manageProducts')}
            </p>
          </div>
        </Link>
        <Link to="/admin/quotes" className="group block">
          <div className="bg-card hover:bg-secondary border-border rounded-lg border p-5 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t('admin.dashboard.quotes')}
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {savedQuotes.length}
                </p>
              </div>
              <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <FileText className="size-4.5" />
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              {t('admin.dashboard.manageQuotes')}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
