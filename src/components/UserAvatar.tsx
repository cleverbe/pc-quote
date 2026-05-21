import { User, Settings, LogOut, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export function UserAvatar() {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hover:ring-ring ring-border flex size-8 items-center justify-center overflow-hidden rounded-full ring-1 transition-all hover:ring-2"
        >
          <img
            src="/images/user_avatar.jpg"
            alt="User avatar"
            className="size-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <img
            src="/images/user_avatar.jpg"
            alt="User avatar"
            className="ring-border size-9 rounded-full object-cover ring-1"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Shield className="size-3" />
              {t('common.role')}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>
          <User className="size-4" />
          {t('common.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Settings className="size-4" />
          {t('common.settings')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {}}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          {t('common.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
