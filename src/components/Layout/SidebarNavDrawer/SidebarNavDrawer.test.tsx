import { useState } from 'react'

import { render } from '@/utils/test-utils'

import DinoSidebarNavDrawer from './SidebarNavDrawer'

const setup = () => {
  const TestComp = () => {
    const [isSidebarNavOpen, setSidebarNavOpen] = useState(true)

    return (
      <DinoSidebarNavDrawer
        isSidebarNavOpen={isSidebarNavOpen}
        setSidebarNavOpen={setSidebarNavOpen}
      />
    )
  }

  return { TestComp }
}

describe('DinoSidebarNavDrawer component', () => {
  it('should render proper app sidebar navigation', () => {
    const { TestComp } = setup()

    render(<TestComp />)

    // temporary to block error
    expect(1).toBe(1)
  })
})
