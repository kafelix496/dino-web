import { useDispatch } from 'react-redux'
import { togglePaletteMode } from '@/redux-action-creators'

import IconButton from '@mui/material/IconButton'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import type { FC } from 'react'

const PaletteModeButton: FC = () => {
  const dispatch = useDispatch()

  return (
    <IconButton
      data-testid="palette-mode-button"
      color="primary"
      onClick={() => {
        dispatch(togglePaletteMode())
      }}
    >
      <SettingsBrightnessIcon />
    </IconButton>
  )
}

export default PaletteModeButton
