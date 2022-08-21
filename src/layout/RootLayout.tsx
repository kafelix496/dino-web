import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import type { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material'

import { PaletteModes } from '@/constants/app'
import ToastList from '@/layout/ToastList/ToastList'
import { selectPaletteMode } from '@/redux-selectors'

import useTheme from './useTheme'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const { t } = useTranslation('common')
  const paletteMode = useSelector(selectPaletteMode)
  const isDarkMode = paletteMode === PaletteModes.DARK
  const { theme } = useTheme({ isDarkMode })

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <meta name="theme-color" content={isDarkMode ? '#ffffff' : '#000000'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <ToastList />
    </ThemeProvider>
  )
}

export default RootLayout
