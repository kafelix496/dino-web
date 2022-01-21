import type { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'

import DinoHeader from './Header/Header'
import DinoSidebar from './Sidebar/Sidebar'

import useDinoTheme from './useTheme'
import { Apps } from '@/global-types'
import type { State } from '@/redux-types'

const DinoLayout: FC = ({ children }) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const paletteMode = useSelector((state: State) => state.theme.paletteMode)
  const { theme } = useDinoTheme({ paletteMode })

  const hasSidebar =
    Object.values(Apps).find((app) =>
      new RegExp(`^/${app}`).test(router.pathname)
    ) !== undefined

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="__d-flex">
        <DinoHeader withSidebarMenu={hasSidebar} />

        {hasSidebar ? <DinoSidebar /> : null}

        <Paper
          className="__d-grow"
          component="main"
          elevation={0}
          square={true}
          sx={{ height: '100vh' }}
        >
          <Toolbar />

          <Box sx={{ height: (theme) => `calc(100% - ${theme.spacing(8)})` }}>
            <Container sx={{ height: '100%' }}>{children}</Container>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}

export default DinoLayout
