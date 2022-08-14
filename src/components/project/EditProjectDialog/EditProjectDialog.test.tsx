import { Apps } from '@/constants/app'
import { act, fireEvent, render, screen } from '@/utils/testing-library'

import EditProjectDialog from './EditProjectDialog'

describe('EditProjectDialog component', () => {
  test('the button should not be disabled at the beginning', async () => {
    render(
      <EditProjectDialog
        appAbbreviation={Apps.moneyTracker}
        id=""
        title=""
        description=""
        closeDialog={jest.fn()}
      />
    )

    await act(async () => {
      const createButton = await screen.findByRole('button', {
        name: 'BUTTON_CONFIRM'
      })!
      expect(createButton).toHaveClass('Mui-disabled')
    })
  })

  test('should enable the button when the user types something on the title', async () => {
    render(
      <EditProjectDialog
        appAbbreviation={Apps.moneyTracker}
        id=""
        title=""
        description=""
        closeDialog={jest.fn()}
      />
    )

    const titleInput = screen.getByRole('textbox', {
      name: 'PROJECT_TITLE'
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
