import { useTranslation } from 'next-i18next'
import type { ComponentType, FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import type { CSSObject, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import TooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'
import { DRAWER_WIDTH } from '@/constants'

import type { SetSidebarNavOpen } from '../useSidebarNavState'

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(11)} + 1px)`
})

interface SidebarNavDrawerProps {
  DrawerContent: ComponentType<{ isSidebarNavOpen: boolean }> | null
  isSidebarNavOpen: boolean
  setSidebarNavOpen: SetSidebarNavOpen
}

const SidebarNavDrawer: FC<SidebarNavDrawerProps> = ({
  DrawerContent,
  isSidebarNavOpen,
  setSidebarNavOpen
}) => {
  const { t } = useTranslation('common')

  return (
    <>
      {DrawerContent && (
        <Drawer
          sx={[
            (theme: Theme) => ({
              ...(isSidebarNavOpen && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme)
              })
            }),
            (theme: Theme) => ({
              ...(!isSidebarNavOpen && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme)
              })
            })
          ]}
          variant="permanent"
          anchor="left"
        >
          <Toolbar className="__d-flex __d-justify-between">
            <Typography>{t('SETTINGS')}</Typography>
            <TooltipIconButton
              title={t('CLOSE')}
              iconButtonProps={{ onClick: () => setSidebarNavOpen(false) }}
            >
              <CloseIcon />
            </TooltipIconButton>
          </Toolbar>
          <Divider />
          <Box
            className="__d-relative"
            sx={{
              height: (theme: Theme) => `calc(100% - ${theme.spacing(8)} - 1px)`
            }}
          >
            <DrawerContent isSidebarNavOpen={isSidebarNavOpen} />
          </Box>
        </Drawer>
      )}
    </>
  )
}

export default SidebarNavDrawer
