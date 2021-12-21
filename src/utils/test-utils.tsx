import type { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { makeStore } from '@/redux-store'

const Providers: FC = ({ children }) => (
  <Provider store={makeStore()}>{children}</Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
