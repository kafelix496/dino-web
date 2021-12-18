import { fireEvent, render, screen } from '@testing-library/react'

import DinoNewProjectFormDialog from './NewProjectFormDialog'

describe('DinoNewProjectFormDialog component', () => {
  test('button is disabled at the beginning', async () => {
    render(<DinoNewProjectFormDialog isOpen={true} handleClose={jest.fn()} />)

    const createButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })!
    expect(createButton).toHaveClass('Mui-disabled')
  })

  test('button is enabled when user type something at title', async () => {
    render(<DinoNewProjectFormDialog isOpen={true} handleClose={jest.fn()} />)

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
