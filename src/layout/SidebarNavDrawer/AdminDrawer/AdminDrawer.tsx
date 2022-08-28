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

import { Apps } from '@/constants/app'

const AdminDrawer: FC = () => {
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
          sx={{ height: (theme: Theme) => theme.spacing(8) }}
          disablePadding={true}
        >
          <Link href={menu.url} replace>
            <ListItemButton
              selected={menu.selected}
              sx={{ height: (theme: Theme) => theme.spacing(6) }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'initial',
                  width: (theme: Theme) => `${theme.spacing(3)}`
                }}
              >
                {menu.iconComponent}
              </ListItemIcon>
              <ListItemText primary={menu.label} sx={{ ml: 3 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default AdminDrawer
