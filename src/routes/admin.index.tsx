import { createFileRoute, Link } from '@tanstack/react-router'
import { useStore } from '@/hooks/use-store'
import { Package, Tags } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { categories, products } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Manage your product catalog
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/admin/categories" className="group block">
          <div className="bg-card hover:bg-secondary border-border rounded-lg border p-5 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Categories
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
              Manage categories →
            </p>
          </div>
        </Link>
        <Link to="/admin/products" className="group block">
          <div className="bg-card hover:bg-secondary border-border rounded-lg border p-5 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Products
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
              Manage products →
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
