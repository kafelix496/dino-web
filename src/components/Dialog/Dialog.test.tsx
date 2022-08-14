import { useCallback, useState } from 'react'

import { render, screen } from '@/utils/testing-library'

import Dialog from './Dialog'

const setup = ({ initialOpenStatus }: { initialOpenStatus: boolean }) => {
  const mockTitle = 'TEST_TITLE'
  const mockSubmitCallback = jest.fn()
  const mockContentText = 'CONTENT_JSX'
  const mockActionsText = 'ACTIONS_JSX'
  const TestComponent = (props: {
    wrapBodyWithForm?: boolean
    handleFormSubmit?: () => void
    contentJsx?: JSX.Element
    actionsJsx?: JSX.Element
  }) => {
    const [isOpen, setOpen] = useState(initialOpenStatus)
    const handleCloseDialog = useCallback(() => {
      setOpen(false)
    }, [])

    return (
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        title={mockTitle}
        {...props}
      />
    )
  }

  return {
    mockTitle,
    mockSubmitCallback,
    mockContentText,
    mockActionsText,
    TestComponent
  }
}

describe('Dialog component', () => {
  it('should not render when isOpen prop is false', async () => {
    const { mockTitle, TestComponent } = setup({ initialOpenStatus: false })

    render(<TestComponent />)

    const dialogTitle = screen.queryByText(mockTitle)
    expect(dialogTitle).not.toBeInTheDocument()
  })

  it('should render when isOpen prop is true', async () => {
    const { mockTitle, TestComponent } = setup({ initialOpenStatus: true })

    render(<TestComponent />)

    const dialogTitle = screen.queryByText(mockTitle)
    expect(dialogTitle).toBeInTheDocument()
  })

  it('should not render form tag by default', () => {
    const { TestComponent } = setup({ initialOpenStatus: true })

    render(<TestComponent />)

    const form = screen.queryByTestId('form')
    expect(form).not.toBeInTheDocument()
  })

  it('should render form tag if wrapBodyWithForm is true and handleFormSubmit is passed', () => {
    const { mockSubmitCallback, TestComponent } = setup({
      initialOpenStatus: true
    })

    render(
      <TestComponent
        wrapBodyWithForm={true}
        handleFormSubmit={mockSubmitCallback}
      />
    )

    const form = screen.queryByTestId('form')
    expect(form).toBeInTheDocument()
  })

  it("should render contentJsx element if it's passed", () => {
    const { mockContentText, TestComponent } = setup({
      initialOpenStatus: true
    })

    render(<TestComponent contentJsx={<div>{mockContentText}</div>} />)

    const dialogContent = screen.queryByText(mockContentText)
    expect(dialogContent).toBeInTheDocument()
  })

  it("should not render contentJsx element if it's not passed", () => {
    const { mockContentText, TestComponent } = setup({
      initialOpenStatus: true
    })

    render(<TestComponent />)

    const dialogContent = screen.queryByText(mockContentText)
    expect(dialogContent).not.toBeInTheDocument()
  })

  it("should not render actionsJsx element if it's not passed", () => {
    const { mockActionsText, TestComponent } = setup({
      initialOpenStatus: true
    })

    render(<TestComponent />)

    const dialogActions = screen.queryByText(mockActionsText)
    expect(dialogActions).not.toBeInTheDocument()
  })
})
