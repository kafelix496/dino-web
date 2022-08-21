import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'

import Layout from '@/layout'
import { store } from '@/redux-store'
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
  ...props
}: MyAppProps) => {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={props.pageProps.session}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
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
