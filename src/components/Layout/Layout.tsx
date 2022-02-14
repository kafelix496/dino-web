import { useState } from 'react'
import type { FC } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'

import DinoHeader from './Header/Header'
import DinoSidebarNavDrawer from './SidebarNavDrawer/SidebarNavDrawer'
import DinoSettingsButton from './SettingsDrawer/SettingsDrawer'

import useDinoTheme from './useTheme'
import type { State } from '@/redux-types'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

const DinoLayout: FC = ({ children }) => {
  const { t } = useTranslation('common')
  const [isSidebarNavOpen, setSidebarNavOpen] = useState(false)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const paletteMode = useSelector((state: State) => state.settings.paletteMode)
  const prefersDarkMode = useMediaQuery(COLOR_SCHEME_QUERY)
  const { theme } = useDinoTheme({
    isDarkMode:
      paletteMode !== 'system'
        ? paletteMode === 'dark'
        : prefersDarkMode ?? false
  })

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="__d-flex">
        <DinoHeader
          setSidebarNavOpen={setSidebarNavOpen}
          setSettingsOpen={setSettingsOpen}
        />

        <DinoSidebarNavDrawer
          isSidebarNavOpen={isSidebarNavOpen}
          setSidebarNavOpen={setSidebarNavOpen}
        />

        <DinoSettingsButton
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

export default DinoLayout
