import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { render, screen, fireEvent } from '@testing-library/react'

import Home from '@/pages/index'

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render title and description', () => {
    render(<Home />)

    const pageTitle = screen.getByRole('heading', {
      name: /PAGE_TITLE/
    })
    expect(pageTitle).toBeInTheDocument()
    const pageDescription = screen.getByRole('heading', {
      name: /PAGE_DESCRIPTION/
    })
    expect(pageDescription).toBeInTheDocument()
  })

  it('should render page link buttons', () => {
    render(<Home />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
    const moneyManagerButton = screen.getByRole('button', {
      name: 'MONEY_MANAGER_APP'
    })
    expect(moneyManagerButton).toBeInTheDocument()
  })

  it("should not clickable if it wasn't signed in & authNeed is true", () => {
    const mockRouter = { push: jest.fn() }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

    render(<Home />)

    const moneyManagerButton = screen.getByRole('button', {
      name: 'MONEY_MANAGER_APP'
    })
    expect(moneyManagerButton).toHaveAttribute('disabled')
    fireEvent.click(moneyManagerButton)
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('should clickable if it was signed in', () => {
    const mockRouter = { push: jest.fn() }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Home />)

    const moneyManagerButton = screen.getByRole('button', {
      name: 'MONEY_MANAGER_APP'
    })
    expect(moneyManagerButton).not.toHaveAttribute('disabled')
    fireEvent.click(moneyManagerButton)
    expect(mockRouter.push).toHaveBeenCalledWith('/money-manager')
  })
})
