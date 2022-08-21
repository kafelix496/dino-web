import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/redux-store'
import { createEmotionCache } from '@/utils/mui'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/react'

import '../styles/globals.scss'

interface AppPropsWithLayout extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  ...props
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={props.pageProps.session}>
          {getLayout(<Component {...props.pageProps} />)}
        </SessionProvider>
      </CacheProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { appProps, pageProps: { ...appProps } }
}

export default appWithTranslation(MyApp)
