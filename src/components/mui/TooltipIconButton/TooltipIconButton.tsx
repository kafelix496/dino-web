import type { FC, ReactNode } from 'react'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

interface TooltipIconButtonProps {
  children: ReactNode
  title: string
  iconButtonProps?: { [key: string]: unknown }
}

export const TooltipIconButton: FC<TooltipIconButtonProps> = ({
  title,
  iconButtonProps,
  children
}) => {
  return (
    <Tooltip title={title}>
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </Tooltip>
  )
}
