import type { ComponentType } from 'react'
import type { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
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
    <Box
      className={`__d-flex${!isInitialized ? ' __d-opacity-0' : ''}`}
      sx={{ transition: 'opacity 0.2s linear' }}
    >
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
    </Box>
  )
}

export default BaseLayout
