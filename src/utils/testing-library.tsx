import type { FC, ReactElement, ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { SWRProvider } from '@/pages/_app'
import { makeStore } from '@/redux-store'
import { render, renderHook } from '@testing-library/react'
import type { RenderHookOptions } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <ReduxProvider store={makeStore()}>
    <SWRProvider>{children}</SWRProvider>
  </ReduxProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

const customRenderHook = <T = unknown, U = unknown>(
  callback: (props: U) => T,
  options?: Omit<RenderHookOptions<U>, 'wrapper'>
) => renderHook<T, U>(callback, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
export { customRenderHook as renderHook }
