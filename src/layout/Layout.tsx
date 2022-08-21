import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'

import { PaletteModes } from '@/constants/app'
import ToastList from '@/layout/ToastList/ToastList'
import { selectPaletteMode } from '@/redux-selectors'

import Header from './Header/Header'
import SettingsDrawer from './SettingsDrawer/SettingsDrawer'
import SidebarNavDrawer from './SidebarNavDrawer/SidebarNavDrawer'
import useDrawerContent from './useDrawerContent'
import { useInitializeApp } from './useInitializeApp'
import useSidebarNavState from './useSidebarNavState'
import useTheme from './useTheme'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isInitialized } = useInitializeApp()
  const { t } = useTranslation('common')
  const router = useRouter()
  const paletteMode = useSelector(selectPaletteMode)
  const [isSidebarNavOpen, setSidebarNavOpen] = useSidebarNavState(
    true
    // nookies.get()[Cookies.sidebarNav] === 'true'
  )
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const { theme } = useTheme({
    isDarkMode: paletteMode === PaletteModes.DARK
  })
  const DrawerContent = useDrawerContent()
  const isErrorPage = /^\/(4\d\d)|(5\d\d)/.test(router.pathname)

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        className={`__d-flex${!isInitialized ? ' __d-opacity-0' : ''}`}
        sx={{ transition: 'opacity 0.2s linear' }}
      >
        {isErrorPage && (
          <Box className="__d-grow __d-h-screen" component="main">
            <Paper elevation={0} square={true}>
              {children}
            </Paper>
          </Box>
        )}

        {!isErrorPage && (
          <>
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
                {children}
              </Paper>
            </Box>
          </>
        )}
      </Box>

      <ToastList />
    </ThemeProvider>
  )
}

export default Layout
