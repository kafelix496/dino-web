import type { FC } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper'

import DinoHeader from './Header/Header'

import useDinoTheme from './useTheme'
import type { State } from '@/redux-types'

const DinoLayout: FC = ({ children }) => {
  const { t } = useTranslation('common')
  const paletteMode = useSelector((state: State) => state.theme.paletteMode)
  const { theme } = useDinoTheme({ paletteMode })

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DinoHeader />

      <Paper
        elevation={0}
        square={true}
        sx={{ height: (theme) => `calc(100vh - ${theme.spacing(8)})` }}
      >
        {children}
      </Paper>
    </ThemeProvider>
  )
}

export default DinoLayout
