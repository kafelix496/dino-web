import type { FC, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'next-i18next'

import MenuIcon from '@mui/icons-material/Menu'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import useDinoHeaderButtonColor from '../useHeaderButtonColor'

interface DinoSidebarNavButtonProps {
  setSidebarNavOpen: Dispatch<SetStateAction<boolean>>
}

const DinoSidebarNavButton: FC<DinoSidebarNavButtonProps> = ({
  setSidebarNavOpen
}) => {
  const { t } = useTranslation('common')
  const headerButtonColor = useDinoHeaderButtonColor()

  return (
    <DinoTooltipIconButton
      title={t('MAIN_MENU')}
      iconButtonProps={{
        sx: { color: headerButtonColor },
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
