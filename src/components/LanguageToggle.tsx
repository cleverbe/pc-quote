import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
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
