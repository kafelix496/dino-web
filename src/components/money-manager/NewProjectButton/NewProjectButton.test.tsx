import { fireEvent, render, screen } from '@testing-library/react'

import DinoNewProjectButton from './NewProjectButton'

describe('DinoNewProjectButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render dialog on initial render', () => {
    render(<DinoNewProjectButton />)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).not.toBeInTheDocument()
  })

  it('should render dialog when button is clicked', () => {
    render(<DinoNewProjectButton />)

    const newButton = screen.getByTestId('button')
    fireEvent.click(newButton)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).toBeInTheDocument()
  })
})
