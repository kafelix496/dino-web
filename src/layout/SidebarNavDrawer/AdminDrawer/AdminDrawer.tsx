import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

import { Apps } from '@/constants'

interface AdminDrawerProps {
  isSidebarNavOpen: boolean
}

const AdminDrawer: FC<AdminDrawerProps> = ({ isSidebarNavOpen }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const appAbbreviation = router.query.appAbbreviation
  const menus = [
    {
      iconComponent: <PhotoLibrary />,
      label: t('APP_NAME_FAMILY_ALBUM'),
      url: `/app/${Apps.familyAlbum}/admin/user/list`,
      selected: appAbbreviation === Apps.familyAlbum
    },
    {
      iconComponent: <AttachMoney />,
      label: t('APP_NAME_MONEY_TRACKER'),
      url: `/app/${Apps.moneyTracker}/admin/user/list`,
      selected: appAbbreviation === Apps.moneyTracker
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
          <Link href={menu.url} replace shallow={false}>
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
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default AdminDrawer
