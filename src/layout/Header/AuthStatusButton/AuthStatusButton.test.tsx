import { signIn, signOut } from 'next-auth/react'

import { getMockUser } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { fireEvent, render, screen } from '@/utils/testing-library'

import AuthStatusButton from './AuthStatusButton'

jest.mock('@/redux-selectors', () => {
  const originalModule = jest.requireActual('@/redux-selectors')

  return {
    __esModule: true,
    ...originalModule,
    selectUser: jest.fn()
  }
})

describe('AuthStatusButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render a sign in button', () => {
    ;(selectUser as jest.Mock).mockReturnValueOnce(null)

    render(<AuthStatusButton />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_IN'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signOut).not.toHaveBeenCalled()
    expect(signIn).toHaveBeenCalledWith('google')
  })

  it('should render a sign out button', () => {
    const mockUser = getMockUser()
    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<AuthStatusButton />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_OUT'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signIn).not.toHaveBeenCalled()
    expect(signOut).toHaveBeenCalled()
  })
})
