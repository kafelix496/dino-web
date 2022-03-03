import type { FC } from 'react'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

interface TooltipIconButtonProps {
  title: string
  iconButtonProps?: { [key: string]: any }
}

const TooltipIconButton: FC<TooltipIconButtonProps> = ({
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

export default TooltipIconButton
