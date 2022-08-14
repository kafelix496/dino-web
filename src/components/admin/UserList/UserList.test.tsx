import { getMockUser, getMockUsers } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { render, screen } from '@/utils/testing-library'

import UserList from './UserList'

jest.mock('@/redux-selectors', () => {
  const originalModule = jest.requireActual('@/redux-selectors')

  return {
    __esModule: true,
    ...originalModule,
    selectUser: jest.fn()
  }
})

describe('#UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render every users', () => {
    const mockUser = getMockUser()
    const mockUsers = getMockUsers()

    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<UserList users={mockUsers} />)

    const user1Email = screen.getByText('dino.test4962@gmail.com')
    expect(user1Email).toBeInTheDocument()
    const user2Email = screen.getByText('dino.test4963@gmail.com')
    expect(user2Email).toBeInTheDocument()
  })
})
