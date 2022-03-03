import { fireEvent, render, screen } from '@testing-library/react'

import EditProjectDialog from './EditProjectDialog'

describe('EditProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <EditProjectDialog
        appType=""
        isOpen={true}
        handleClose={jest.fn()}
        id=""
        title=""
        description=""
      />
    )

    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CONFIRM'
    })!
    expect(createButton).toHaveClass('Mui-disabled')
  })

  test('should enable the button when the user types something on the title', async () => {
    render(
      <EditProjectDialog
        appType=""
        isOpen={true}
        handleClose={jest.fn()}
        id=""
        title=""
        description=""
      />
    )

    const titleInput = screen.getByRole('textbox', {
      name: 'PROJECT_TITLE'
    })
    expect(titleInput).toBeInTheDocument()
    fireEvent.change(titleInput, { target: { value: 'TEXT' } })
    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CONFIRM'
    })!
    expect(createButton).not.toHaveClass('Mui-disabled')
  })
})
