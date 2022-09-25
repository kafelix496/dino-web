import { act, render, screen } from '@/utils/testing-library'

import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'

const setup = () => {
  const mockTitle = 'TEST_TITLE'
  const mockDescription = 'TEST_DESCRIPTION'
  const mockHandleDelete = jest.fn()
  const mockHandleClose = jest.fn()
  const TestComponent = () => {
    return (
      <DeleteConfirmationDialog
        title={mockTitle}
        description={mockDescription}
        handleDelete={mockHandleDelete}
        closeDialog={mockHandleClose}
      />
    )
  }

  return {
    mockTitle,
    mockDescription,
    mockHandleDelete,
    mockHandleClose,
    TestComponent
  }
}

describe('DeleteConfirmationDialog component', () => {
  it('should render initial values', () => {
    const { mockTitle, mockDescription, TestComponent } = setup()

    render(<TestComponent />)

    const dialogTitle = screen.queryByText(mockTitle)
    expect(dialogTitle).toBeInTheDocument()
    const dialogDescriiption = screen.queryByText(mockDescription)
    expect(dialogDescriiption).toBeInTheDocument()
  })

  it('should call handleDelete function when a user clicks BUTTON_DELETE', async () => {
    const { mockHandleDelete, TestComponent } = setup()

    render(<TestComponent />)

    const deleteButton = screen.queryByText('BUTTON_DELETE')
    expect(mockHandleDelete).not.toHaveBeenCalled()
    expect(deleteButton).toBeInTheDocument()
    await act(async () => {
      deleteButton!.click()
      expect(mockHandleDelete).toHaveBeenCalled()
    })
  })

  it('should call handleClose function when a user clicks BUTTON_CANCEL', async () => {
    const { mockHandleClose, TestComponent } = setup()

    render(<TestComponent />)

    const closeButton = screen.queryByText('BUTTON_CANCEL')
    expect(mockHandleClose).not.toHaveBeenCalled()
    expect(closeButton).toBeInTheDocument()
    await act(async () => {
      closeButton!.click()
      expect(mockHandleClose).toHaveBeenCalled()
    })
  })
})
