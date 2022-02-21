import { signIn, signOut, useSession } from 'next-auth/react'

import { fireEvent, render, screen } from '@/utils/test-utils'

import DinoAuthStatusButton from './AuthStatusButton'

describe('DinoAuthStatusButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render a sign in button', () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

    render(<DinoAuthStatusButton />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_IN'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signOut).not.toHaveBeenCalled()
    expect(signIn).toHaveBeenCalledWith('google')
  })

  it('should render a sign out button', () => {
    render(<DinoAuthStatusButton />)

    const authButton = screen.getByRole('button', {
      name: 'SIGN_OUT'
    })
    expect(authButton).toBeInTheDocument()
    fireEvent.click(authButton)
    expect(signIn).not.toHaveBeenCalled()
    expect(signOut).toHaveBeenCalled()
  })
})
