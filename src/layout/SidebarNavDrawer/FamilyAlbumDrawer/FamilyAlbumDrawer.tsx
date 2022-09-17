import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import DeckIcon from '@mui/icons-material/Deck'
import type { Theme } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { CategoryFormDialog } from '@/components/album/CategoryFormDialog/CategoryFormDialog'
import { Apps } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useCategories } from '@/hooks/useHttpAlbum'
import { useIsAdminOrAbove } from '@/hooks/useIsAdmin'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'
import DrawerSkeleton from '@/layout/SidebarNavDrawer/DrawerSkeleton/DrawerSkeleton'
import FamilyAlbumDrawerMenuItem from '@/layout/SidebarNavDrawer/FamilyAlbumDrawerMenuItem/FamilyAlbumDrawerMenuItem'
import type { DrawerMenuItem } from '@/types/album'

const FamilyAlbumDrawer: FC = () => {
  const { isLoading, categories } = useCategories({ isReady: true })
  const { t } = useTranslation('common')
  const { state, openDialog, closeDialog } = useDialogStatus()
  const { isAdminOrAbove } = useIsAdminOrAbove()
  const { postPageQueryParams } = usePostPageQueryParams()
  const menus: DrawerMenuItem[] = !isLoading
    ? [
        {
          id: '',
          iconComponent: <AllInboxIcon />,
          label: t('DRAWER_MENU_ITEM_ALL'),
          url: `/app/${Apps.familyAlbum}/album`,
          selected: postPageQueryParams.qpCategoryId === undefined,
          editable: false
        }
      ].concat(
        categories.map((category) => ({
          id: category._id,
          iconComponent: <DeckIcon />,
          label: category.name,
          url: `/app/${Apps.familyAlbum}/album?qpCategoryId=${category._id}`,
          selected: postPageQueryParams.qpCategoryId === category._id,
          editable: true
        }))
      )
    : []
  const addCategoryMenu = {
    iconComponent: <AddIcon />,
    label: t('DRAWER_MENU_ITEM_ADD_CATEGORY')
  }

  return (
    <div className="__d-relative __d-h-full">
      <List
        sx={{
          maxHeight: (theme: Theme) =>
            `calc(100% - ${theme.spacing(10)} - 1px)`,
          overflowY: 'auto'
        }}
      >
        {isLoading && [1, 2, 3].map((item) => <DrawerSkeleton key={item} />)}
        {!isLoading &&
          menus.map((menu) => (
            <FamilyAlbumDrawerMenuItem
              key={menu.id}
              expanded={true}
              canEditCategory={isAdminOrAbove}
              menu={menu}
            />
          ))}
      </List>

      {isAdminOrAbove && (
        <>
          <Divider />
          <List>
            <ListItem
              sx={{ height: (theme: Theme) => theme.spacing(8) }}
              disablePadding={true}
            >
              <ListItemButton
                sx={{ height: (theme: Theme) => theme.spacing(6) }}
                onClick={() => {
                  openDialog()
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'initial',
                    width: (theme: Theme) => `${theme.spacing(3)}`
                  }}
                >
                  {addCategoryMenu.iconComponent}
                </ListItemIcon>
                <ListItemText primary={addCategoryMenu.label} sx={{ ml: 3 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}

      {isAdminOrAbove && state.isOpen && (
        <CategoryFormDialog closeDialog={closeDialog} />
      )}
    </div>
  )
}

export default FamilyAlbumDrawer
