import { render, screen } from '@/utils/testing-library'

import ErrorMessageBlock from './ErrorMessageBlock'

describe('#ErrorMessageBlock', () => {
  it('should render message', () => {
    render(<ErrorMessageBlock message="test error message" />)

    const testErrorMessageBlock = screen.getByText('test error message')

    expect(testErrorMessageBlock).toBeInTheDocument()
  })
})
