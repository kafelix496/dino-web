import { useCallback, useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import NewProjectFormDialog from './NewProjectFormDialog'

const setup = ({ initialOpenStatus }: { initialOpenStatus: boolean }) => {
  const TestComp = () => {
    const [isOpen, setOpen] = useState(initialOpenStatus)
    const handleClose = useCallback(() => {
      setOpen(false)
    }, [])

    return <NewProjectFormDialog isOpen={isOpen} handleClose={handleClose} />
  }

  return { TestComp }
}

describe('NewProjectFormDialog component', () => {
  it('should not render when isOpen prop is false', async () => {
    const { TestComp } = setup({ initialOpenStatus: false })

    render(<TestComp />)

    const createButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(createButton).not.toBeInTheDocument()
  })

  it('should render when isOpen prop is true', async () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const createButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })
    expect(createButton).toBeInTheDocument()
  })

  test('button is disabled at the beginning', async () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const createButton = screen.queryByRole('button', {
      name: 'BUTTON_CREATE'
    })!
    expect(createButton).toHaveClass('Mui-disabled')
  })

  test('button is enabled when user type something at title', async () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const titleInput = screen.getByRole('textbox', {
      name: 'PROJECT_TITLE'
    })
    expect(titleInput).toBeInTheDocument()
    fireEvent.change(titleInput, { target: { value: 'TEXT' } })
    const createButton = await screen.findByRole('button', {
      name: 'BUTTON_CREATE'
    })!
    expect(createButton).not.toHaveClass('Mui-disabled')
  })
})
