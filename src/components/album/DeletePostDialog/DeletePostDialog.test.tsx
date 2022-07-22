import { act, render, screen } from '@/utils/test-utils'

import DeletePostDialog from './DeletePostDialog'

describe('DeletePostDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(<DeletePostDialog isOpen={true} handleClose={jest.fn()} id="" />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_DELETE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
