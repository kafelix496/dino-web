import { createSnapshot } from '@/react-testing-library'

import Layout from './Layout'

describe('Layout component', () => {
  it('should render layout as expected', () => {
    const layoutComponent = createSnapshot(<Layout />)
    expect(layoutComponent).toMatchSnapshot()
  })
})
