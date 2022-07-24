import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'

import type { Theme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

import DeleteCategoryDialog from '@/components/album/DeleteCategoryDialog/DeleteCategoryDialog'
import EditCategoryDialog from '@/components/album/EditCategoryDialog/EditCategoryDialog'
import MaxHeightMenu from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import useDialogStatus from '@/hooks/useDialogStatus'
import type { DrawerMenuItem } from '@/types/album'

interface FamilyAlbumDrawerMenuItemProps {
  isSidebarNavOpen: boolean
  canEditCategory: boolean
  menu: DrawerMenuItem
}

const FamilyAlbumDrawerMenuItem: FC<FamilyAlbumDrawerMenuItemProps> = ({
  isSidebarNavOpen,
  canEditCategory,
  menu
}) => {
  const { t } = useTranslation('common')
  const { state, handleOpen, handleClose } = useDialogStatus()

  const menuOptions: MenuOption[] = [
    {
      label: t('EDIT'),
      click: () => {
        handleOpen('edit')
      }
    },
    {
      label: t('DELETE'),
      click: () => {
        handleOpen('delete')
      }
    }
  ]

  return (
    <>
      <ListItem
        className={!isSidebarNavOpen ? '__d-justify-center' : ''}
        sx={{ height: (theme: Theme) => theme.spacing(8) }}
        secondaryAction={
          isSidebarNavOpen &&
          canEditCategory &&
          menu.editable && (
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

      {canEditCategory && (
        <>
          {state.isOpen && state.name === 'edit' && (
            <EditCategoryDialog
              handleClose={handleClose}
              id={menu.id}
              name={menu.label}
            />
          )}

          {state.isOpen && state.name === 'delete' && (
            <DeleteCategoryDialog handleClose={handleClose} id={menu.id} />
          )}
        </>
      )}
    </>
  )
}

export default FamilyAlbumDrawerMenuItem
