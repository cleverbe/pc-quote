import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import {
  MonitorSmartphone,
  Wrench,
  Store,
  Languages,
  Menu,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="bg-card border-b">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
              <MonitorSmartphone className="size-4" />
            </span>
            PC Quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-muted-foreground hover:text-foreground ml-auto flex items-center md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <nav className="hidden items-center gap-1 text-sm md:flex">
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

          <div className="hidden md:block">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
          />
          <nav className="bg-card fixed top-14 right-0 z-50 flex h-[calc(100vh-3.5rem)] w-56 flex-col gap-1 border-l p-4 shadow-lg md:hidden">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:bg-secondary [&.active]:bg-secondary rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/build"
              onClick={() => setOpen(false)}
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              <Wrench className="size-4" />
              {t('nav.build')}
            </Link>
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="hover:bg-secondary [&.active]:bg-secondary flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              <Store className="size-4" />
              {t('nav.admin')}
            </Link>
            <div className="mt-auto border-t pt-3">
              <LanguageToggle />
            </div>
          </nav>
        </>
      )}

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
