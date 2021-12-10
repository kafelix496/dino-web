import { useDispatch } from 'react-redux'
import { togglePaletteMode } from '@/redux-action-creators'

import IconButton from '@mui/material/IconButton'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import { useHeaderButtonColor } from '../useHeaderButtonColor'

import type { FC } from 'react'

const PaletteModeButton: FC = () => {
  const dispatch = useDispatch()
  const headerButtonColor = useHeaderButtonColor()

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

export default PaletteModeButton
