import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useState } from 'react'
import type { FC } from 'react'

import { ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import { usePaletteMode } from '@/redux-selectors'

import Header from './Header/Header'
import SettingsDrawer from './SettingsDrawer/SettingsDrawer'
import SidebarNavDrawer from './SidebarNavDrawer/SidebarNavDrawer'
import useDrawerContent from './useDrawerContent'
import useSidebarNavState from './useSidebarNavState'
import useTheme from './useTheme'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

interface LayoutProps {
  initialSidebarNavOpenState: boolean
}

const Layout: FC<LayoutProps> = ({ initialSidebarNavOpenState, children }) => {
  const { t } = useTranslation('common')
  const [isSidebarNavOpen, setSidebarNavOpen] = useSidebarNavState(
    initialSidebarNavOpenState
  )
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const paletteMode = usePaletteMode()
  const prefersDarkMode = useMediaQuery(COLOR_SCHEME_QUERY)
  const { theme } = useTheme({
    isDarkMode:
      paletteMode !== 'system'
        ? paletteMode === 'dark'
        : prefersDarkMode ?? false
  })
  const DrawerContent = useDrawerContent()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="__d-flex">
        <Header
          hasSidebarNav={!!DrawerContent}
          setSidebarNavOpen={setSidebarNavOpen}
          setSettingsOpen={setSettingsOpen}
        />

        <SidebarNavDrawer
          DrawerContent={DrawerContent}
          isSidebarNavOpen={isSidebarNavOpen}
          setSidebarNavOpen={setSidebarNavOpen}
        />

        <SettingsDrawer
          isSettingsOpen={isSettingsOpen}
          setSettingsOpen={setSettingsOpen}
        />

        <Box className="__d-grow __d-h-screen" component="main">
          <Toolbar />

          <Paper
            elevation={0}
            square={true}
            sx={{ height: (theme) => `calc(100% - ${theme.spacing(8)})` }}
          >
            <Container className="__d-h-full">{children}</Container>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
