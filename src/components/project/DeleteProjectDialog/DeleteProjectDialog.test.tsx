import { Apps } from '@/constants/app'
import { act, render, screen } from '@/utils/testing-library'

import { DeleteProjectDialog } from './DeleteProjectDialog'

describe('DeleteProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <DeleteProjectDialog
        appAbbreviation={Apps.moneyTracker}
        id=""
        closeDialog={jest.fn()}
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
