import { useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

import SettingsIcon from '@mui/icons-material/Settings'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'
import DinoSettingsDrawer from './SettingsDrawer/SettingsDrawer'

import useDinoHeaderButtonColor from '../useHeaderButtonColor'

const DinoSettingsButton: FC = () => {
  const { t } = useTranslation('common')
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const headerButtonColor = useDinoHeaderButtonColor()

  return (
    <>
      <DinoTooltipIconButton
        title={t('TOGGLE_SETTINGS_DRAWER')}
        iconButtonProps={{
          sx: { color: headerButtonColor },
          onClick: () => {
            setSettingsOpen(true)
          }
        }}
      >
        <SettingsIcon />
      </DinoTooltipIconButton>

      <DinoSettingsDrawer
        isSettingsOpen={isSettingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    </>
  )
}

export default DinoSettingsButton
