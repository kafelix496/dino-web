import type { FC } from 'react'
import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Data = Record<string, unknown>
export interface MenuOption {
  label: string
  click: (data: Data | undefined) => void
  data?: Data
}

interface MaxHeightMenuProps {
  options: MenuOption[]
  extraIconButtonProps?: Record<string, unknown>
}

const MaxHeightMenu: FC<MaxHeightMenuProps> = ({
  options,
  extraIconButtonProps
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseDialog = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton onClick={handleClick} {...extraIconButtonProps}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseDialog}>
        {options.map(({ label, click, data }) => (
          <MenuItem
            key={label}
            onClick={() => {
              click(data)

              handleCloseDialog()
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default MaxHeightMenu
