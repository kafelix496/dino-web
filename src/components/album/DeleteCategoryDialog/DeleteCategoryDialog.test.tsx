import { act, render, screen } from '@/utils/test-utils'

import DeleteCategoryDialog from './DeleteCategoryDialog'

describe('DeleteCategoryDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(<DeleteCategoryDialog id="" closeDialog={jest.fn()} />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_DELETE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
