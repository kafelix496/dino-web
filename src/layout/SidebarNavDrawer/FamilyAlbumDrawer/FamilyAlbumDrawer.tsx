import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
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
import DeleteCategoryDialog from '@/components/album/DeleteCategoryDialog/DeleteCategoryDialog'
import EditCategoryDialog from '@/components/album/EditCategoryDialog/EditCategoryDialog'
import MaxHeightMenu from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import { AccessLevels, Apps } from '@/constants'
import useDialogStatus from '@/hooks/useDialogStatus'
import { selectCategoryList, selectUser } from '@/redux-selectors'

interface FamilyAlbumDrawerProps {
  isSidebarNavOpen: boolean
}

const FamilyAlbumDrawer: FC<FamilyAlbumDrawerProps> = ({
  isSidebarNavOpen
}) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const user = useSelector(selectUser)
  const dataRef = useRef<Record<string, unknown> | undefined>(undefined)
  const {
    state: createCategoryDialogState,
    handleOpen: handleCreateCategoryOpen,
    handleClose: handleCreateCategoryClose
  } = useDialogStatus()
  const {
    state: editCategoryDialogState,
    handleOpen: handleEditCategoryOpen,
    handleClose: handleEditCategoryClose
  } = useDialogStatus()
  const {
    state: deleteCategoryDialogState,
    handleOpen: handleDeleteCategoryOpen,
    handleClose: handleDeleteCategoryClose
  } = useDialogStatus()

  const categoryId = router.query.categoryId
  const canEditCategory =
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.SUPER_ADMIN ||
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.ADMIN
  const categories = useSelector(selectCategoryList)
  const menus = [
    {
      id: '',
      iconComponent: <AllInboxIcon />,
      label: t('DRAWER_MENU_ITEM_ALL'),
      url: `/app/${Apps.familyAlbum}/album/list`,
      selected: categoryId === undefined,
      editable: false
    }
  ].concat(
    categories.map((category) => ({
      id: category._id,
      iconComponent: <DeckIcon />,
      label: category.name,
      url: `/app/${Apps.familyAlbum}/album/list?categoryId=${category._id}`,
      selected: categoryId === category._id,
      editable: true
    }))
  )
  const menuOptions: MenuOption[] = [
    {
      label: t('EDIT'),
      click: (data) => {
        dataRef.current = data

        handleEditCategoryOpen()
      }
    },
    {
      label: t('DELETE'),
      click: (data) => {
        dataRef.current = data

        handleDeleteCategoryOpen()
      }
    }
  ]
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
        {menus.map((menu, index) => (
          <ListItem
            key={index}
            className={!isSidebarNavOpen ? '__d-justify-center' : ''}
            sx={{ height: (theme: Theme) => theme.spacing(8) }}
            secondaryAction={
              isSidebarNavOpen && (
                <MaxHeightMenu
                  options={menuOptions.map((menuOption) => ({
                    ...menuOption,
                    data: { categoryId: menu.id, name: menu.label }
                  }))}
                  extraIconButtonProps={{ edge: 'end' }}
                />
              )
            }
            disablePadding={isSidebarNavOpen}
          >
            <Link href={menu.url} replace shallow={true}>
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

      {canEditCategory && (
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
                  handleCreateCategoryOpen()
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

      <CreateCategoryDialog
        isOpen={createCategoryDialogState.isOpen}
        handleClose={handleCreateCategoryClose}
      />

      <EditCategoryDialog
        isOpen={editCategoryDialogState.isOpen}
        handleClose={handleEditCategoryClose}
        id={dataRef.current?.categoryId as string}
        name={dataRef.current?.name as string}
      />

      <DeleteCategoryDialog
        isOpen={deleteCategoryDialogState.isOpen}
        handleClose={handleDeleteCategoryClose}
        id={dataRef.current?.categoryId as string}
      />
    </div>
  )
}

export default FamilyAlbumDrawer
