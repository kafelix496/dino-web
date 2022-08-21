import type { FC, ReactNode } from 'react'

import type { Theme } from '@mui/material'
import Button from '@mui/material/Button'

interface SettingDrawerButtonProps {
  children: ReactNode
  selected: boolean
  onClick: () => void
}

const SettingDrawerButton: FC<SettingDrawerButtonProps> = ({
  selected = false,
  onClick,
  children
}) => (
  <Button
    fullWidth
    variant={selected ? 'contained' : 'outlined'}
    sx={[
      {
        borderColor: (theme: Theme) => `${theme.palette.primary.main}!important`
      }
    ]}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default SettingDrawerButton
