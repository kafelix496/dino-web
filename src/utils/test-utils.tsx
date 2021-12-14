import type { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { makeStore } from '@/redux-store'
import renderer from 'react-test-renderer'

const Providers: FC = ({ children }) => (
  <Provider store={makeStore()}>{children}</Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

const createSnapshot = (ui: ReactElement) =>
  renderer.create(<Provider store={makeStore()}>{ui}</Provider>).toJSON()

export * from '@testing-library/react'
export { createSnapshot }
export { customRender as render }
