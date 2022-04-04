import { render, screen } from '@/utils/test-utils'

import UsersDataGrid from './UsersDataGrid'

jest.mock('./useRowsAndCols.tsx', () =>
  jest.fn().mockImplementation(() => ({
    error: 'fake error'
  }))
)

describe('#UsersDataGrid', () => {
  it('should render error page if data fetching is failed', () => {
    render(<UsersDataGrid />)

    const unexpectedErrorBlock = screen.getByText('SEM_UNEXPECTED_ERROR')

    expect(unexpectedErrorBlock).toBeInTheDocument()
  })
})
