import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight">PC Quote</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Build and quote custom computer configurations for your clients.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild size="lg">
          <Link to="/admin/products">Manage Products</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/admin/categories">Manage Categories</Link>
        </Button>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1. Categories</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Create product categories like Processors, RAM, Keyboards, etc.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2. Products</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add products with prices and assign them to categories.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3. Quote</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Select components and generate a quote with the total price.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
