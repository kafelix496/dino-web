import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import MenuIcon from '@mui/icons-material/Menu'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import type { SetSidebarNavOpen } from '../../useSidebarNavState'
import headerButtonMixin from '../headerButtonMixin'

interface DinoSidebarNavButtonProps {
  setSidebarNavOpen: SetSidebarNavOpen
}

const DinoSidebarNavButton: FC<DinoSidebarNavButtonProps> = ({
  setSidebarNavOpen
}) => {
  const { t } = useTranslation('common')

  return (
    <DinoTooltipIconButton
      title={t('MAIN_MENU')}
      iconButtonProps={{
        sx: { color: headerButtonMixin },
        onClick: () => {
          setSidebarNavOpen((prev) => !prev)
        }
      }}
    >
      <MenuIcon />
    </DinoTooltipIconButton>
  )
}

export default DinoSidebarNavButton
