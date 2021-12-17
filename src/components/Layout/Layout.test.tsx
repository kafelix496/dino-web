import { createSnapshot } from '@/utils/test-utils'

import DinoLayout from './Layout'

describe('DinoLayout component', () => {
  it('should render layout as expected', () => {
    const layoutComponent = createSnapshot(<DinoLayout />)
    expect(layoutComponent).toMatchSnapshot()
  })
})
