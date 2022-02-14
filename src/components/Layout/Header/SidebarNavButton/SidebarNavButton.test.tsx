import { useState } from 'react'

import { render, screen, fireEvent } from '@/utils/test-utils'

import DinoSidebarNavButton from './SidebarNavButton'

const setup = () => {
  const TestComp = () => {
    const [isSidebarNavOpen, setSidebarNavOpen] = useState(false)

    return (
      <>
        <DinoSidebarNavButton setSidebarNavOpen={setSidebarNavOpen} />
        <div data-testid="sidebar-nav-open-status">
          {String(isSidebarNavOpen)}
        </div>
      </>
    )
  }

  return { TestComp }
}

describe('DinoSidebarNavButton component', () => {
  it('should toggle sidebar navigation open status when the user clicks sidebar navigation button', () => {
    const { TestComp } = setup()

    render(<TestComp />)

    const sidebarNavButton = screen.getByLabelText('MAIN_MENU')
    const sidebarNavOpenStatus = screen.getByTestId('sidebar-nav-open-status')
    expect(sidebarNavOpenStatus.innerHTML).toBe('false')
    fireEvent.click(sidebarNavButton)
    expect(sidebarNavOpenStatus.innerHTML).toBe('true')
    fireEvent.click(sidebarNavButton)
    expect(sidebarNavOpenStatus.innerHTML).toBe('false')
  })
})
