import type { FC } from 'react'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

interface DinoTooltipIconButtonProps {
  title: string
  iconButtonProps?: { [key: string]: any }
}

const DinoTooltipIconButton: FC<DinoTooltipIconButtonProps> = ({
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

export default DinoTooltipIconButton
