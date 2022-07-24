import { Apps } from '@/constants/app'
import { act, render, screen } from '@/utils/test-utils'

import DeleteProjectDialog from './DeleteProjectDialog'

describe('DeleteProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <DeleteProjectDialog
        appAbbreviation={Apps.moneyTracker}
        handleClose={jest.fn()}
        id=""
      />
    )

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_DELETE'
      })!
      expect(createButton).not.toHaveClass('Mui-disabled')
    })
  })
})
