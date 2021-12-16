import { useDispatch } from 'react-redux'
import { togglePaletteMode } from '@/redux-action-creators'

import IconButton from '@mui/material/IconButton'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import useDinoHeaderButtonColor from '../useHeaderButtonColor'

import type { FC } from 'react'

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
