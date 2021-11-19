import { useDispatch } from 'react-redux'
import { togglePaletteMode } from '@/redux-action-creators'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { styled } from '@mui/material/styles'

import type { FC } from 'react'

const CustomizedIconButton = styled(({ className, ...props }: IconButtonProps) => (
  <IconButton {...props} classes={{ root: className }} />
))(
  ({ theme }) => `
  &.MuiIconButton-root {
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 10px;
  }
  &.MuiIconButton-root:hover {
    background-color: ${theme.palette.bgHoverDim};
  }

  &.MuiIconButton-root .MuiSvgIcon-root {
    color: ${
      theme.palette.mode === 'dark'
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main
    };
  }
`
)

const PaletteModeButton: FC = () => {
  const dispatch = useDispatch()

  return (
    <CustomizedIconButton
      onClick={() => {
        dispatch(togglePaletteMode())
      }}
    >
      <SettingsBrightnessIcon />
    </CustomizedIconButton>
  )
}

export default PaletteModeButton
