import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

describe('Home', () => {
  it('should render a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /PAGE_TITLE/
    })

    expect(heading).toBeInTheDocument()
  })
})
