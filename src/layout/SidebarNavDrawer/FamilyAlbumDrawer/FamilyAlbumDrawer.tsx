import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useSelector } from 'react-redux'

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
import Tooltip from '@mui/material/Tooltip'

import CreateCategoryDialog from '@/components/album/CreateCategoryDialog/CreateCategoryDialog'
import { Apps } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useIsAdminOrAbove } from '@/hooks/useIsAdmin'
import FamilyAlbumDrawerMenuItem from '@/layout/SidebarNavDrawer/FamilyAlbumDrawerMenuItem/FamilyAlbumDrawerMenuItem'
import {
  selectCategoryList,
  selectSidebarNavOpenStatus
} from '@/redux-selectors'
import type { DrawerMenuItem } from '@/types/album'

const FamilyAlbumDrawer: FC = () => {
  const isSidebarNavOpen = useSelector(selectSidebarNavOpenStatus)
  const router = useRouter()
  const { t } = useTranslation('common')
  const { state, openDialog, closeDialog } = useDialogStatus()
  const { isAdminOrAbove } = useIsAdminOrAbove()
  const categoryId = router.query.categoryId
  const categories = useSelector(selectCategoryList)
  const menus: DrawerMenuItem[] = [
    {
      id: '',
      iconComponent: <AllInboxIcon />,
      label: t('DRAWER_MENU_ITEM_ALL'),
      url: `/app/${Apps.familyAlbum}/album`,
      selected: categoryId === undefined,
      editable: false
    }
  ].concat(
    categories.map((category) => ({
      id: category._id,
      iconComponent: <DeckIcon />,
      label: category.name,
      url: `/app/${Apps.familyAlbum}/album?categoryId=${category._id}`,
      selected: categoryId === category._id,
      editable: true
    }))
  )
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
        {menus.map((menu) => (
          <FamilyAlbumDrawerMenuItem
            key={menu.id}
            isSidebarNavOpen={isSidebarNavOpen}
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
              className={!isSidebarNavOpen ? '__d-justify-center' : ''}
              sx={{ height: (theme: Theme) => theme.spacing(8) }}
              disablePadding={isSidebarNavOpen}
            >
              <ListItemButton
                sx={{ height: (theme: Theme) => theme.spacing(6) }}
                onClick={() => {
                  openDialog()
                }}
              >
                <Tooltip title={!isSidebarNavOpen ? addCategoryMenu.label : ''}>
                  <ListItemIcon
                    sx={{
                      minWidth: 'initial',
                      width: (theme: Theme) => `${theme.spacing(3)}`
                    }}
                  >
                    {addCategoryMenu.iconComponent}
                  </ListItemIcon>
                </Tooltip>
                {isSidebarNavOpen ? (
                  <ListItemText
                    primary={addCategoryMenu.label}
                    sx={{ ml: 3 }}
                  />
                ) : null}
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}

      {isAdminOrAbove && (
        <>
          {state.isOpen && <CreateCategoryDialog closeDialog={closeDialog} />}
        </>
      )}
    </div>
  )
}

export default FamilyAlbumDrawer
