import { SWRConfig } from 'swr'
import axios from 'axios'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'next-auth/client'

import { wrapper } from '@/redux-store'

import Layout from '@/components/Layout/Layout'

import '../styles/globals.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        fallback: pageProps.fallback,
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
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
