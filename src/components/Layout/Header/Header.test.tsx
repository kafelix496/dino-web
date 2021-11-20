import { useSession } from 'next-auth/client'

import { createSnapshot } from '@/react-testing-library'

import Header from './Header'

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render header as expected when user didn't sign in", () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

    const headerComponent = createSnapshot(<Header />)
    expect(headerComponent).toMatchSnapshot()
  })

  it('should render header as expected when user signed in', () => {
    const headerComponent = createSnapshot(<Header />)
    expect(headerComponent).toMatchSnapshot()
  })
})
