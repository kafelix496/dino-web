import { render, screen } from '@testing-library/react'

import DinoDeleteProjectDialog from './DeleteProjectDialog'

describe('DinoDeleteProjectDialog component', () => {
  test('button is disabled at the beginning', async () => {
    render(
      <DinoDeleteProjectDialog isOpen={true} handleClose={jest.fn()} id="" />
    )

    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CONFIRM'
    })!
    expect(createButton).not.toHaveClass('Mui-disabled')
  })
})
