import { signIn, signOut } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import { AccessLevels, Apps } from '@/constants/app'
import { getMockUser } from '@/mock-data/user.mockData'
import { setUser } from '@/redux-actions'
import { fireEvent, render, screen } from '@/utils/testing-library'

import AuthStatusButton from './AuthStatusButton'

const setup = ({
  isLogin,
  appAbbreviation,
  accessLevel
}: {
  isLogin: boolean
  appAbbreviation?: unknown
  accessLevel?: AccessLevels
}) => {
  const TestComponent = () => {
    const dispatch = useDispatch()
    if (isLogin) {
      const mockUser = getMockUser()
      mockUser.accessLevel[appAbbreviation as Apps] = accessLevel!
      dispatch(setUser(mockUser))
    } else {
      dispatch(setUser(null))
    }

    return <AuthStatusButton />
  }

  return { TestComponent }
}

describe('AuthStatusButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render a sign in button', () => {
    const { TestComponent } = setup({ isLogin: false })

    render(<TestComponent />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_IN'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signOut).not.toHaveBeenCalled()
    expect(signIn).toHaveBeenCalledWith('google')
  })

  it('should render a sign out button', () => {
    const { TestComponent } = setup({
      isLogin: true,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.ADMIN
    })

    render(<TestComponent />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_OUT'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signIn).not.toHaveBeenCalled()
    expect(signOut).toHaveBeenCalled()
  })
})
