import { fireEvent, render, screen } from '@testing-library/react'

import DinoCreateProjectDialog from './CreateProjectDialog'

import { Apps } from '@/global-types'

describe('DinoCreateProjectDialog component', () => {
  test('the button should be disabled at the beginning', async () => {
    render(
      <DinoCreateProjectDialog
        appType={Apps.moneyTracker}
        isOpen={true}
        handleClose={jest.fn()}
      />
    )

    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CREATE'
    })!
    expect(createButton).toHaveClass('Mui-disabled')
  })

  it('should enable the button when the user types something on the title', async () => {
    render(
      <DinoCreateProjectDialog
        appType={Apps.moneyTracker}
        isOpen={true}
        handleClose={jest.fn()}
      />
    )

    const titleInput = screen.getByRole('textbox', {
      name: 'PROJECT_TITLE'
    })
    expect(titleInput).toBeInTheDocument()
    fireEvent.change(titleInput, { target: { value: 'TEXT' } })
    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CREATE'
    })!
    expect(createButton).not.toHaveClass('Mui-disabled')
  })
})
