import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
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
import useDrawerContent from './useDrawerContent'
import useSidebarNavState from './useSidebarNavState'
import useTheme from './useTheme'

const SidebarNavDrawer = dynamic(
  () => import('./SidebarNavDrawer/SidebarNavDrawer')
)
const SettingsDrawer = dynamic(() => import('./SettingsDrawer/SettingsDrawer'))

interface LayoutProps {
  children: ReactNode
  isErrorPage: boolean
  isSidebarNavOpen: boolean
}

const Layout: FC<LayoutProps> = ({
  isErrorPage,
  isSidebarNavOpen: isSidebarNavOpenInit,
  children
}) => {
  const { t } = useTranslation('common')
  const paletteMode = useSelector(selectPaletteMode)
  const [isSidebarNavOpen, setSidebarNavOpen] =
    useSidebarNavState(isSidebarNavOpenInit)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const { theme } = useTheme({
    isDarkMode: paletteMode === PaletteModes.DARK
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
