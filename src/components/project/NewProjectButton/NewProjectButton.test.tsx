import { Apps } from '@/constants/app'
import { fireEvent, render, screen } from '@/utils/test-utils'

import NewProjectButton from './NewProjectButton'

describe('NewProjectButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render dialog on initial render', () => {
    render(<NewProjectButton appAbbreviation={Apps.moneyTracker} />)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).not.toBeInTheDocument()
  })

  it('should render dialog when button is clicked', () => {
    render(<NewProjectButton appAbbreviation={Apps.moneyTracker} />)

    const newButton = screen.getByTestId('button')
    fireEvent.click(newButton)

    const dialogButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(dialogButton).toBeInTheDocument()
  })
})
