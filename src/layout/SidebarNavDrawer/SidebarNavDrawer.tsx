import type { ComponentType, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { CSSObject, Theme } from '@mui/material'
import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import { DRAWER_WIDTH } from '@/constants/app'
import { setSidebarNavOpenStatus } from '@/redux-actions'
import { selectSidebarNavOpenStatus } from '@/redux-selectors'

interface SidebarNavDrawerProps {
  DrawerContent: ComponentType
}

const drawerMixin = (theme: Theme): CSSObject => ({
  transition:
    theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.short
    }) + '!important'
})

const SidebarNavDrawer: FC<SidebarNavDrawerProps> = ({ DrawerContent }) => {
  const isSidebarNavOpen = useSelector(selectSidebarNavOpenStatus)
  const dispatch = useDispatch()

  return (
    <>
      <Drawer
        sx={[
          {
            '& .MuiDrawer-paper': (theme: Theme) => drawerMixin(theme)
          },
          {
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH }
          }
        ]}
        anchor="left"
        variant="persistent"
        open={isSidebarNavOpen}
        onClose={() => {
          dispatch(setSidebarNavOpenStatus(false))
        }}
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

      {/* to main content pushed */}
      <Paper
        sx={[
          {
            width: isSidebarNavOpen ? DRAWER_WIDTH : 0,
            transition: (theme: Theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard
              })
          },
          (theme: Theme) => drawerMixin(theme)
        ]}
      />
    </>
  )
}

export default SidebarNavDrawer
