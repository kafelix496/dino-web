import type { ComponentType, FC } from 'react'
import { useSelector } from 'react-redux'

import type { CSSObject, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import { DRAWER_WIDTH } from '@/constants/app'
import { selectSidebarNavOpenStatus } from '@/redux-selectors'

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
  DrawerContent: ComponentType
}

const SidebarNavDrawer: FC<SidebarNavDrawerProps> = ({ DrawerContent }) => {
  const isSidebarNavOpen = useSelector(selectSidebarNavOpenStatus)

  return (
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
      <Toolbar className="__d-flex __d-justify-between"></Toolbar>
      <Divider />
      <Box
        className="__d-relative"
        sx={{
          height: (theme: Theme) => `calc(100% - ${theme.spacing(8)} - 1px)`
        }}
      >
        <DrawerContent />
      </Box>
    </Drawer>
  )
}

export default SidebarNavDrawer
