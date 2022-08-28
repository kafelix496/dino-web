import type { ComponentType } from 'react'
import type { FC, ReactNode } from 'react'

import type { Theme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'

import Header from './Header/Header'
import SettingsDrawer from './SettingsDrawer/SettingsDrawer'
import SidebarNavDrawer from './SidebarNavDrawer/SidebarNavDrawer'
import { useInitializeApp } from './useInitializeApp'

interface BaseLayoutProps {
  DrawerContent?: ComponentType
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ DrawerContent, children }) => {
  const { isInitialized } = useInitializeApp()

  return (
    <Box className="__d-flex">
      <Header hasSidebarNav={!!DrawerContent} />

      {!!DrawerContent && <SidebarNavDrawer DrawerContent={DrawerContent} />}

      <SettingsDrawer />

      <Box className="__d-grow __d-h-screen" component="main">
        <Toolbar />

        <Paper
          elevation={0}
          square={true}
          sx={{ height: (theme) => `calc(100% - ${theme.spacing(8)})` }}
        >
          {children}
        </Paper>
      </Box>

      <Paper
        elevation={0}
        square={true}
        className={
          `__d-backdrop-paper` +
          (isInitialized ? ' __d-backdrop-paper--initialized' : '')
        }
      >
        <Backdrop
          sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Box>
  )
}

export default BaseLayout
