import type { FC } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper'
import type { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import Header from './Header/Header'

import useCustomizedTheme from './useCustomizedTheme'

import type { State } from '@/redux-types'

const CustomizedPaper = styled(({ className, ...props }: PaperProps) => (
  <Paper {...props} elevation={0} square={true} classes={{ root: className }} />
))(
  ({ theme }) => `
  &.MuiPaper-root {
    height: calc(100vh - ${theme.spacing(8)});
  }
`
)

const Layout: FC = ({ children }) => {
  const { t } = useTranslation('common')
  const paletteMode = useSelector((state: State) => state.theme.paletteMode)
  const { theme } = useCustomizedTheme({ paletteMode })

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <CustomizedPaper>{children}</CustomizedPaper>
    </ThemeProvider>
  )
}

export default Layout
