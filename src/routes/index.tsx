import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Wrench,
  Package,
  Tags,
  MonitorSmartphone,
  ChevronRight,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const steps = [
  {
    icon: Tags,
    title: '1. Categories',
    desc: 'Create product categories like Processors, RAM, Storage.',
    color: 'text-sky-600 bg-sky-50',
    to: '/admin/categories',
  },
  {
    icon: Package,
    title: '2. Products',
    desc: 'Add components with prices and assign them to categories.',
    color: 'text-emerald-600 bg-emerald-50',
    to: '/admin/products',
  },
  {
    icon: Wrench,
    title: '3. Build & Quote',
    desc: 'Select components and generate a quote with the total.',
    color: 'text-violet-600 bg-violet-50',
    to: '/build',
  },
]

function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl">
          <MonitorSmartphone className="size-7" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">PC Quote</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Build and quote custom computer configurations.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/build">
              <Wrench className="size-4" />
              Start Building
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/admin">Admin Panel</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, desc, color, to }) => (
          <Link key={to} to={to} className="group block">
            <Card className="hover:bg-secondary h-full transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    className={`flex size-7 items-center justify-center rounded-md ${color}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3 text-sm">
                <p>{desc}</p>
                <p className="group-hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors">
                  Open <ChevronRight className="size-3" />
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
