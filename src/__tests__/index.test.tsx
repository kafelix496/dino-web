import { useSession } from 'next-auth/client'
import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render title and description', () => {
    render(<Home />)

    const pageTitle = screen.getByRole('heading', {
      name: /HOME_PAGE_TITLE/
    })
    expect(pageTitle).toBeInTheDocument()
    const pageDescription = screen.getByRole('heading', {
      name: /HOME_PAGE_DESCRIPTION/
    })
    expect(pageDescription).toBeInTheDocument()
  })

  it('should render page link buttons', () => {
    render(<Home />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
    const moneyTrackerButton = screen.getByRole('button', {
      name: 'HOME_PAGE_MONEY_TRACKER_APP'
    })
    expect(moneyTrackerButton).toBeInTheDocument()
  })

  it("should not clickable if it wasn't signed in & authNeed is true", () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([null])

    render(<Home />)

    const moneyTrackerButton = screen.getByRole('button', {
      name: 'HOME_PAGE_MONEY_TRACKER_APP'
    })
    expect(moneyTrackerButton).toHaveAttribute('disabled')
    expect(moneyTrackerButton).not.toHaveAttribute('data-testhref')
  })

  it('should clickable if it was signed in', () => {
    render(<Home />)

    const moneyTrackerButton = screen.getByRole('button', {
      name: 'HOME_PAGE_MONEY_TRACKER_APP'
    })
    expect(moneyTrackerButton).not.toHaveAttribute('disabled')
    expect(moneyTrackerButton).toHaveAttribute(
      'data-testhref',
      '/money-tracker'
    )
  })
})
