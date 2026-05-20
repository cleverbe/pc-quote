import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/lib/store'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { categories, products } = useStore()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{categories.length}</p>
            <Link to="/admin/categories" className="text-sm text-muted-foreground underline">
              Manage categories
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{products.length}</p>
            <Link to="/admin/products" className="text-sm text-muted-foreground underline">
              Manage products
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
