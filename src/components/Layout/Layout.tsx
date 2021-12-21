import type { FC } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper'
import type { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import DinoHeader from './Header/Header'

import useDinoTheme from './useTheme'
import type { State } from '@/redux-types'

const DinoStyledPaper = styled(({ className, ...props }: PaperProps) => (
  <Paper {...props} elevation={0} square={true} classes={{ root: className }} />
))(
  ({ theme }) => `
  &.MuiPaper-root {
    height: calc(100vh - ${theme.spacing(8)});
  }
`
)

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

      <DinoStyledPaper>{children}</DinoStyledPaper>
    </ThemeProvider>
  )
}

export default DinoLayout
