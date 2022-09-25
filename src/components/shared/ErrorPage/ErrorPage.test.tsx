import { render, screen } from '@/utils/testing-library'

import { ErrorPage } from './ErrorPage'

describe('ErrorPage component', () => {
  describe('should render a proper text', () => {
    test('when statusCode is 404', () => {
      render(<ErrorPage statusCode={404} />)

      const errorTypography = screen.getByText('ERROR_404_MESSAGE')

      expect(errorTypography).toBeInTheDocument()
    })

    test('when statusCode is 500', () => {
      render(<ErrorPage statusCode={500} />)

      const errorTypography = screen.getByText('ERROR_500_MESSAGE')

      expect(errorTypography).toBeInTheDocument()
    })
  })

  it('should render "go to homepage" button and link root when clicked', () => {
    render(<ErrorPage statusCode={404} />)

    const goToHomepageButton = screen.getByRole('button', {
      name: 'GO_TO_HOMEPAGE'
    })

    expect(goToHomepageButton).toBeInTheDocument()
    expect(goToHomepageButton).toHaveAttribute('data-testhref', '/')
  })
})
