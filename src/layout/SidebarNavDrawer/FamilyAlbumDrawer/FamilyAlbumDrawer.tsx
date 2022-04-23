import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import AllInboxIcon from '@mui/icons-material/AllInbox'
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

const FamilyAlbumDrawer: FC<AdminDrawerProps> = ({ isSidebarNavOpen }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const categoryId = router.query.categoryId
  const menus = [
    {
      iconComponent: <AllInboxIcon />,
      label: t('DRAWER_MENU_ITEM_ALL'),
      url: `/app/${Apps.familyAlbum}/album/list`,
      selected: categoryId === undefined
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

export default FamilyAlbumDrawer
