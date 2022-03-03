import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import MenuIcon from '@mui/icons-material/Menu'

import TooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import type { SetSidebarNavOpen } from '../../useSidebarNavState'
import headerButtonMixin from '../headerButtonMixin'

interface SidebarNavButtonProps {
  setSidebarNavOpen: SetSidebarNavOpen
}

const SidebarNavButton: FC<SidebarNavButtonProps> = ({ setSidebarNavOpen }) => {
  const { t } = useTranslation('common')

  return (
    <TooltipIconButton
      title={t('MAIN_MENU')}
      iconButtonProps={{
        sx: { color: headerButtonMixin },
        onClick: () => {
          setSidebarNavOpen((prev) => !prev)
        }
      }}
    >
      <MenuIcon />
    </TooltipIconButton>
  )
}

export default SidebarNavButton
