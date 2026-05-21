import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { MonitorSmartphone, Wrench, Store, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { t } = useTranslation()

  return (
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
              {t('nav.home')}
            </Link>
            <Link
              to="/build"
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors"
            >
              <Wrench className="size-3.5" />
              {t('nav.build')}
            </Link>
            <Link
              to="/admin"
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors"
            >
              <Store className="size-3.5" />
              {t('nav.admin')}
            </Link>
          </nav>
          <LanguageToggle />
        </div>
      </header>
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </>
  )
}

function LanguageToggle() {
  const { i18n } = useTranslation()

  function toggle() {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors"
    >
      <Languages className="size-3.5" />
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
