import { render, screen } from '@testing-library/react'

import DinoDeleteProjectDialog from './DeleteProjectDialog'

import { Apps } from '@/global-constants'

describe('DinoDeleteProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <DinoDeleteProjectDialog
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
