import { act, fireEvent, render, screen } from '@/utils/test-utils'

import CreateCategoryDialog from './CreateCategoryDialog'

describe('CreateCategoryDialog component', () => {
  test('the button should be disabled at the beginning', async () => {
    render(<CreateCategoryDialog closeDialog={jest.fn()} />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_CREATE'
      })!
      expect(createButton).toHaveClass('Mui-disabled')
    })
  })

  it('should enable the button when the user types something on the name', async () => {
    render(<CreateCategoryDialog closeDialog={jest.fn()} />)

    const titleInput = screen.getByRole('textbox', {
      name: 'CATEGORY_NAME'
    })
    expect(titleInput).toBeInTheDocument()

    fireEvent.change(titleInput, { target: { value: 'TEXT' } })
    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_CREATE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
