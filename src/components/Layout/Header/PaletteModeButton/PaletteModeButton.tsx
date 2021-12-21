import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import useDinoHeaderButtonColor from '../useHeaderButtonColor'
import { togglePaletteMode } from '@/redux-action-creators'

const DinoPaletteModeButton: FC = () => {
  const dispatch = useDispatch()
  const headerButtonColor = useDinoHeaderButtonColor()

  return (
    <IconButton
      data-testid="palette-mode-button"
      sx={{ color: headerButtonColor }}
      onClick={() => {
        dispatch(togglePaletteMode())
      }}
    >
      <SettingsBrightnessIcon />
    </IconButton>
  )
}

export default DinoPaletteModeButton
