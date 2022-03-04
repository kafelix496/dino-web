import { Apps } from '@/constants'
import { fireEvent, render, screen } from '@testing-library/react'

import NewProjectButton from './NewProjectButton'

describe('NewProjectButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render dialog on initial render', () => {
    render(<NewProjectButton appType={Apps.moneyTracker} />)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).not.toBeInTheDocument()
  })

  it('should render dialog when button is clicked', () => {
    render(<NewProjectButton appType={Apps.moneyTracker} />)

    const newButton = screen.getByTestId('button')
    fireEvent.click(newButton)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).toBeInTheDocument()
  })
})
