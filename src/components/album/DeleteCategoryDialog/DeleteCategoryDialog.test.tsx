import { act, render, screen } from '@/utils/test-utils'

import DeleteCategoryDialog from './DeleteCategoryDialog'

describe('DeleteCategoryDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(<DeleteCategoryDialog isOpen={true} handleClose={jest.fn()} id="" />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_DELETE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
