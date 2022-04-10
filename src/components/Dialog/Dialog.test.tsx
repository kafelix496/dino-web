import { useCallback, useState } from 'react'

import { render, screen } from '@/utils/test-utils'

import Dialog from './Dialog'

const setup = ({ initialOpenStatus }: { initialOpenStatus: boolean }) => {
  const mockTitle = 'TEST_TITLE'
  const mockSubmitCallback = jest.fn()
  const mockContentText = 'CONTENT_JSX'
  const mockActionsText = 'ACTIONS_JSX'
  const TestComp = (props: {
    wrapBodyWithForm?: boolean
    handleFormSubmit?: () => void
    contentJsx?: JSX.Element
    actionsJsx?: JSX.Element
  }) => {
    const [isOpen, setOpen] = useState(initialOpenStatus)
    const handleClose = useCallback(() => {
      setOpen(false)
    }, [])

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
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
    TestComp
  }
}

describe('Dialog component', () => {
  it('should not render when isOpen prop is false', async () => {
    const { mockTitle, TestComp } = setup({ initialOpenStatus: false })

    render(<TestComp />)

    const dialogTitle = screen.queryByText(mockTitle)
    expect(dialogTitle).not.toBeInTheDocument()
  })

  it('should render when isOpen prop is true', async () => {
    const { mockTitle, TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const dialogTitle = screen.queryByText(mockTitle)
    expect(dialogTitle).toBeInTheDocument()
  })

  it('should not render form tag by default', () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const form = screen.queryByTestId('form')
    expect(form).not.toBeInTheDocument()
  })

  it('should render form tag if wrapBodyWithForm is true and handleFormSubmit is passed', () => {
    const { mockSubmitCallback, TestComp } = setup({ initialOpenStatus: true })

    render(
      <TestComp wrapBodyWithForm={true} handleFormSubmit={mockSubmitCallback} />
    )

    const form = screen.queryByTestId('form')
    expect(form).toBeInTheDocument()
  })

  it("should render contentJsx element if it's passed", () => {
    const { mockContentText, TestComp } = setup({
      initialOpenStatus: true
    })

    render(<TestComp contentJsx={<div>{mockContentText}</div>} />)

    const dialogContent = screen.queryByText(mockContentText)
    expect(dialogContent).toBeInTheDocument()
  })

  it("should not render contentJsx element if it's not passed", () => {
    const { mockContentText, TestComp } = setup({
      initialOpenStatus: true
    })

    render(<TestComp />)

    const dialogContent = screen.queryByText(mockContentText)
    expect(dialogContent).not.toBeInTheDocument()
  })

  it("should not render actionsJsx element if it's not passed", () => {
    const { mockActionsText, TestComp } = setup({
      initialOpenStatus: true
    })

    render(<TestComp />)

    const dialogActions = screen.queryByText(mockActionsText)
    expect(dialogActions).not.toBeInTheDocument()
  })
})
