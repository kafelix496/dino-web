import { render, screen } from '@/utils/test-utils'

import UsersDataGrid from './UsersDataGrid'
import { getMockUsers1 } from './UsersDataGrid.mockData'

describe('#UsersDataGrid', () => {
  it('should render every users', () => {
    const mockUsers = getMockUsers1()

    render(<UsersDataGrid users={mockUsers} />)

    const user1Email = screen.getByText('dino.test4961@gmail.com')
    expect(user1Email).toBeInTheDocument()
    const user2Email = screen.getByText('dino.test4962@gmail.com')
    expect(user2Email).toBeInTheDocument()
    const user3Email = screen.getByText('dino.test4963@gmail.com')
    expect(user3Email).toBeInTheDocument()
  })
})
