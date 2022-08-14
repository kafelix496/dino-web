import { useState } from 'react'

import { fireEvent, render, screen } from '@/utils/testing-library'

import SidebarNavButton from './SidebarNavButton'

const setup = () => {
  const TestComponent = () => {
    const [isSidebarNavOpen, setSidebarNavOpen] = useState(false)

    return (
      <>
        <SidebarNavButton setSidebarNavOpen={setSidebarNavOpen} />
        <div data-testid="sidebar-nav-open-status">
          {String(isSidebarNavOpen)}
        </div>
      </>
    )
  }

  return { TestComponent }
}

describe('SidebarNavButton component', () => {
  it('should toggle sidebar navigation open status when the user clicks sidebar navigation button', () => {
    const { TestComponent } = setup()

    render(<TestComponent />)

    const sidebarNavButton = screen.getByLabelText('MAIN_MENU')
    const sidebarNavOpenStatus = screen.getByTestId('sidebar-nav-open-status')
    expect(sidebarNavOpenStatus.innerHTML).toBe('false')
    fireEvent.click(sidebarNavButton)
    expect(sidebarNavOpenStatus.innerHTML).toBe('true')
    fireEvent.click(sidebarNavButton)
    expect(sidebarNavOpenStatus.innerHTML).toBe('false')
  })
})
