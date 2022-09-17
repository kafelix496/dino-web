import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'

import type { Theme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

import { CategoryFormDialog } from '@/components/album/CategoryFormDialog/CategoryFormDialog'
import { DeleteCategoryDialog } from '@/components/album/DeleteCategoryDialog/DeleteCategoryDialog'
import { MaxHeightMenu } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import { Actions } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import type { DrawerMenuItem } from '@/types/album'

interface FamilyAlbumDrawerMenuItemProps {
  expanded: boolean
  canEditCategory: boolean
  menu: DrawerMenuItem
}

const FamilyAlbumDrawerMenuItem: FC<FamilyAlbumDrawerMenuItemProps> = ({
  expanded,
  canEditCategory,
  menu
}) => {
  const { t } = useTranslation('common')
  const { state, openDialog, closeDialog } = useDialogStatus()

  const menuOptions: MenuOption[] = [
    {
      label: t('EDIT'),
      click: () => {
        openDialog(Actions.EDIT)
      }
    },
    {
      label: t('DELETE'),
      click: () => {
        openDialog(Actions.DELETE)
      }
    }
  ]

  return (
    <>
      <ListItem
        className={!expanded ? '__d-justify-center' : ''}
        sx={{ height: (theme: Theme) => theme.spacing(8) }}
        secondaryAction={
          expanded &&
          canEditCategory &&
          menu.editable && (
            <MaxHeightMenu
              options={menuOptions}
              extraIconButtonProps={{ edge: 'end' }}
            />
          )
        }
        disablePadding={expanded}
      >
        <Link href={menu.url} replace shallow={true}>
          <ListItemButton
            selected={menu.selected}
            sx={{ height: (theme: Theme) => theme.spacing(6) }}
          >
            <Tooltip title={!expanded ? menu.label : ''}>
              <ListItemIcon
                sx={{
                  minWidth: 'initial',
                  width: (theme: Theme) => `${theme.spacing(3)}`
                }}
              >
                {menu.iconComponent}
              </ListItemIcon>
            </Tooltip>
            {expanded ? (
              <ListItemText primary={menu.label} sx={{ ml: 3 }} />
            ) : null}
          </ListItemButton>
        </Link>
      </ListItem>

      {canEditCategory && (
        <>
          {state.isOpen && state.name === Actions.EDIT && (
            <CategoryFormDialog
              category={{
                _id: menu.id,
                name: menu.label
              }}
              closeDialog={closeDialog}
            />
          )}

          {state.isOpen && state.name === Actions.DELETE && (
            <DeleteCategoryDialog id={menu.id} closeDialog={closeDialog} />
          )}
        </>
      )}
    </>
  )
}

export default FamilyAlbumDrawerMenuItem
