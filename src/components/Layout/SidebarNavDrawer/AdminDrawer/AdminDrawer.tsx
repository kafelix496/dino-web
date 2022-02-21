import type { FC } from 'react'

import MailIcon from '@mui/icons-material/Mail'
import type { Theme } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

const menus = [
  {
    iconComponent: <MailIcon />,
    label: '1111',
    selected: false
  },
  {
    iconComponent: <MailIcon />,
    label: '2222',
    selected: true
  }
]

interface DinoAdminDrawerProps {
  isSidebarNavOpen: boolean
}

const DinoAdminDrawer: FC<DinoAdminDrawerProps> = ({ isSidebarNavOpen }) => {
  return (
    <List>
      {menus.map((menu, index) => (
        <ListItem
          key={index}
          className={!isSidebarNavOpen ? '__d-justify-center' : ''}
          sx={{ height: (theme: Theme) => theme.spacing(8) }}
        >
          <ListItemButton
            selected={menu.selected}
            sx={{ height: (theme: Theme) => theme.spacing(6) }}
          >
            <Tooltip title={!isSidebarNavOpen ? menu.label : ''}>
              <ListItemIcon
                sx={{
                  minWidth: 'initial',
                  width: (theme: Theme) => `${theme.spacing(3)}`
                }}
              >
                {menu.iconComponent}
              </ListItemIcon>
            </Tooltip>
            {isSidebarNavOpen ? (
              <ListItemText primary={menu.label} sx={{ ml: 3 }} />
            ) : null}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default DinoAdminDrawer
