import { useSession } from 'next-auth/client'

import { createSnapshot } from '@/utils/test-utils'

import DinoHeader from './Header'

describe('DinoHeader component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render header as expected when user didn't sign in", () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

    const headerComponent = createSnapshot(<DinoHeader />)
    expect(headerComponent).toMatchSnapshot()
  })

  it('should render header as expected when user signed in', () => {
    const headerComponent = createSnapshot(<DinoHeader />)
    expect(headerComponent).toMatchSnapshot()
  })
})
