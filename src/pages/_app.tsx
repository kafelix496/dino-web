import axios from 'axios'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import nookies from 'nookies'
import type { Dispatch } from 'redux'
import { SWRConfig } from 'swr'

import { Cookies } from '@/constants/cookies'
import Layout from '@/layout'
import { setLocale, setPaletteMode } from '@/redux-actions'
import { wrapper } from '@/redux-store'
import { Locale, PaletteMode } from '@/redux-types/settings'
import { createEmotionCache } from '@/utils/mui'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/react'

import '../styles/globals.scss'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
  emotionCache = clientSideEmotionCache
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <SWRConfig
        value={{
          fallback: pageProps.fallback,
          provider: () => new Map(),
          fetcher: (url) => axios.get(url).then((res) => res.data)
        }}
      >
        <SessionProvider session={pageProps.session}>
          <Layout
            initialSidebarNavOpenState={pageProps.initialSidebarNavOpenState}
          >
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </CacheProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext: AppContext) => {
    const savedPaletteMode = nookies.get(appContext.ctx)[Cookies.paletteMode]
    ;(store.dispatch as Dispatch<any>)(
      setPaletteMode(
        Object.values(PaletteMode).includes(savedPaletteMode as PaletteMode)
          ? (savedPaletteMode as PaletteMode)
          : PaletteMode.SYSTEM
      )
    )

    const savedLocale = nookies.get(appContext.ctx)[Cookies.locale]
    ;(store.dispatch as Dispatch<any>)(
      setLocale(
        Object.values(Locale).includes(savedLocale as Locale)
          ? (savedLocale as Locale)
          : Locale.EN
      )
    )

    const appProps = await App.getInitialProps(appContext)

    return {
      appProps,
      pageProps: {
        ...appProps,
        initialSidebarNavOpenState:
          nookies.get(appContext.ctx)[Cookies.sidebarNav] === 'true'
      }
    }
  }
)

export default wrapper.withRedux(appWithTranslation(MyApp))
