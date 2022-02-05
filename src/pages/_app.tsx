import { SWRConfig } from 'swr'
import axios from 'axios'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'next-auth/client'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import nookies from 'nookies'
import type { Dispatch } from 'redux'

import DinoLayout from '@/components/Layout/Layout'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/react'
import { wrapper } from '@/redux-store'
import { createEmotionCache } from '@/utils/mui'
import { setLocale, setPaletteMode } from '@/redux-action-creators'
import { Locale, PaletteMode } from '@/redux-types/settings'

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
        <Provider session={pageProps.session}>
          <DinoLayout>
            <Component {...pageProps} />
          </DinoLayout>
        </Provider>
      </SWRConfig>
    </CacheProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext: AppContext) => {
    const savedPaletteMode = nookies.get(appContext.ctx).paletteMode
    ;(store.dispatch as Dispatch<any>)(
      setPaletteMode(
        Object.values(PaletteMode).includes(savedPaletteMode as PaletteMode)
          ? (savedPaletteMode as PaletteMode)
          : PaletteMode.SYSTEM
      )
    )

    const savedLocale = nookies.get(appContext.ctx).locale
    ;(store.dispatch as Dispatch<any>)(
      setLocale(
        Object.values(Locale).includes(savedLocale as Locale)
          ? (savedLocale as Locale)
          : Locale.EN
      )
    )

    const appProps = await App.getInitialProps(appContext)

    return appProps
  }
)

export default wrapper.withRedux(appWithTranslation(MyApp))
