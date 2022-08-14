import { act, fireEvent, render, screen } from '@/utils/test-utils'

import EditCategoryDialog from './EditCategoryDialog'

describe('EditCategoryDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(<EditCategoryDialog id="" name="" closeDialog={jest.fn()} />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_CONFIRM'
      })!
      expect(createButton).toHaveClass('Mui-disabled')
    })
  })

  test('should enable the button when the user types something on the name', async () => {
    render(<EditCategoryDialog id="" name="" closeDialog={jest.fn()} />)

    const titleInput = screen.getByRole('textbox', {
      name: 'CATEGORY_NAME'
    })
    expect(titleInput).toBeInTheDocument()
    fireEvent.change(titleInput, { target: { value: 'TEXT' } })
    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_CONFIRM'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
