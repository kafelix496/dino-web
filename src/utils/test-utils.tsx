import type { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '@/redux-store'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <Provider store={makeStore()}>{children}</Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
