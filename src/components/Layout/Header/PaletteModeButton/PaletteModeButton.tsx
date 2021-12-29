import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import useDinoHeaderButtonColor from '../useHeaderButtonColor'
import { togglePaletteMode } from '@/redux-action-creators'

const DinoPaletteModeButton: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const headerButtonColor = useDinoHeaderButtonColor()

  return (
    <DinoTooltipIconButton
      title={t('CHANGE_COLOR_MODE')}
      iconButtonProps={{
        'data-testid': 'palette-mode-button',
        sx: { color: headerButtonColor },
        onClick: () => {
          dispatch(togglePaletteMode())
        }
      }}
    >
      <SettingsBrightnessIcon />
    </DinoTooltipIconButton>
  )
}

export default DinoPaletteModeButton
