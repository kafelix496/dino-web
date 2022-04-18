import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import nookies from 'nookies'
import type { Store } from 'redux'

import { Locale, PaletteMode } from '@/constants'
import { Cookies } from '@/constants/cookies'
import userHttpService from '@/http-services/user'
import Layout from '@/layout'
import { setLocale, setPaletteMode, setUser } from '@/redux-actions'
import { wrapper } from '@/redux-store'
import type { RootState } from '@/redux-types'
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
      <SessionProvider session={pageProps.session}>
        <Layout isSidebarNavOpen={pageProps.isSidebarNavOpen}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </CacheProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: Store<RootState, any>) => async (appContext: AppContext) => {
    const savedPaletteMode = nookies.get(appContext.ctx)[Cookies.paletteMode]
    store.dispatch(
      setPaletteMode(
        Object.values(PaletteMode).includes(savedPaletteMode as PaletteMode)
          ? (savedPaletteMode as PaletteMode)
          : PaletteMode.SYSTEM
      )
    )

    const savedLocale = nookies.get(appContext.ctx)[Cookies.locale]
    store.dispatch(
      setLocale(
        Object.values(Locale).includes(savedLocale as Locale)
          ? (savedLocale as Locale)
          : Locale.EN
      )
    )

    // except error page, fetch user before the page is loaded
    if (!/^\/(4\d\d)|(5\d\d)/.test(appContext.ctx.pathname)) {
      const user = await userHttpService.getCurrentUser({
        headers: { Cookie: appContext.ctx.req?.headers.cookie ?? '' }
      })
      store.dispatch(setUser(user))
    }

    const appProps = await App.getInitialProps(appContext)

    return {
      appProps,
      pageProps: {
        ...appProps,
        isSidebarNavOpen:
          nookies.get(appContext.ctx)[Cookies.sidebarNav] === 'true'
      }
    }
  }
)

export default wrapper.withRedux(appWithTranslation(MyApp))
