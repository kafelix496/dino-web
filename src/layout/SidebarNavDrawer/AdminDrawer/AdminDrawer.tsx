import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import AttachMoney from '@mui/icons-material/AttachMoney'
import PhotoLibrary from '@mui/icons-material/PhotoLibrary'
import type { Theme } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

interface AdminDrawerProps {
  isSidebarNavOpen: boolean
}

const AdminDrawer: FC<AdminDrawerProps> = ({ isSidebarNavOpen }) => {
  const { t } = useTranslation('common')
  const menus = [
    {
      iconComponent: <PhotoLibrary />,
      label: t('APP_NAME_FAMILY_ALBUM'),
      selected: false
    },
    {
      iconComponent: <AttachMoney />,
      label: t('APP_NAME_MONEY_TRACKER'),
      selected: false
    }
  ]

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

export default AdminDrawer
