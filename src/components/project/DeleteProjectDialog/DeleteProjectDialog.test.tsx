import { Apps } from '@/constants'
import { render, screen } from '@testing-library/react'

import DeleteProjectDialog from './DeleteProjectDialog'

describe('DeleteProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <DeleteProjectDialog
        appType={Apps.moneyTracker}
        isOpen={true}
        handleClose={jest.fn()}
        id=""
      />
    )

    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_DELETE'
    })!
    expect(createButton).not.toHaveClass('Mui-disabled')
  })
})
