import { fireEvent, render, screen } from '@testing-library/react'

import DinoEditProjectFormDialog from './EditProjectFormDialog'

describe('DinoEditProjectFormDialog component', () => {
  test('button is disabled at the beginning', async () => {
    render(
      <DinoEditProjectFormDialog
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

  test('button is enabled when user type something at title', async () => {
    render(
      <DinoEditProjectFormDialog
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
