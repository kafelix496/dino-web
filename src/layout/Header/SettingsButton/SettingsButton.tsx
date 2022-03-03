import { useTranslation } from 'next-i18next'
import type { Dispatch, FC, SetStateAction } from 'react'

import SettingsIcon from '@mui/icons-material/Settings'

import TooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import headerButtonMixin from '../headerButtonMixin'

interface SettingsButtonProps {
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
}

const SettingsButton: FC<SettingsButtonProps> = ({ setSettingsOpen }) => {
  const { t } = useTranslation('common')

  return (
    <TooltipIconButton
      title={t('TOGGLE_SETTINGS_DRAWER')}
      iconButtonProps={{
        sx: { color: headerButtonMixin },
        onClick: () => {
          setSettingsOpen(true)
        }
      }}
    >
      <SettingsIcon />
    </TooltipIconButton>
  )
}

export default SettingsButton
