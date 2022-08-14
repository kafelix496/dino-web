import { act, render, screen } from '@/utils/test-utils'

import DeletePostDialog from './DeletePostDialog'

describe('DeletePostDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(<DeletePostDialog id="" assetKeys={[]} closeDialog={jest.fn()} />)

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_DELETE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
