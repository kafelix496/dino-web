import type { FC } from 'react'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

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
    <Tooltip
      title={title}
      componentsProps={{
        tooltip: { sx: { fontSize: '0.8rem', fontWeight: 'bold' } }
      }}
    >
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </Tooltip>
  )
}

export default DinoTooltipIconButton
