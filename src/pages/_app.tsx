import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import nookies from 'nookies'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import { Locales, PaletteModes } from '@/constants/app'
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
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={props.pageProps.session}>
          <Layout
            isErrorPage={props.pageProps.isErrorPage}
            isSidebarNavOpen={props.pageProps.isSidebarNavOpen}
          >
            <Component {...props.pageProps} />
          </Layout>
        </SessionProvider>
      </CacheProvider>
    </Provider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: Store<RootState, any>) => async (appContext: AppContext) => {
    const savedPaletteMode = nookies.get(appContext.ctx)[Cookies.paletteMode]
    store.dispatch(
      setPaletteMode(
        Object.values(PaletteModes).includes(savedPaletteMode as PaletteModes)
          ? (savedPaletteMode as PaletteModes)
          : PaletteModes.LIGHT
      )
    )

    const savedLocale = nookies.get(appContext.ctx)[Cookies.locale]
    store.dispatch(
      setLocale(
        Object.values(Locales).includes(savedLocale as Locales)
          ? (savedLocale as Locales)
          : Locales.EN
      )
    )

    const isErrorPage = /^\/(4\d\d)|(5\d\d)/.test(appContext.ctx.pathname)

    // except error page, fetch user before the page is loaded
    if (!isErrorPage) {
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
        isErrorPage,
        isSidebarNavOpen:
          nookies.get(appContext.ctx)[Cookies.sidebarNav] === 'true'
      }
    }
  }
)

export default appWithTranslation(MyApp)
