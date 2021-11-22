import { useSession, signIn, signOut } from 'next-auth/client'

import { render, screen, fireEvent } from '@/utils/test-utils'

import AuthStatusButton from './AuthStatusButton'

describe('AuthStatusButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render a sign in button', () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

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
