import { SWRConfig } from 'swr'
import axios from 'axios'
import { appWithTranslation } from 'next-i18next'
import { wrapper } from '@/redux-store'
import { Provider } from 'next-auth/client'

import { createTheme, ThemeProvider } from '@mui/material'
import { indigo, grey } from '@mui/material/colors'

import Layout from '@/components/Layout'

import '../styles/globals.scss'

import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: indigo,
    secondary: grey
  },
  typography: {
    fontFamily: 'Lato'
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1080,
      xl: 1536
    }
  }
})

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig
        value={{
          provider: () => new Map(),
          fetcher: (url) => axios.get(url).then((res) => res.data)
        }}
      >
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SWRConfig>
    </ThemeProvider>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
