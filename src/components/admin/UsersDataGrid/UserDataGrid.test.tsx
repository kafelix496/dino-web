import { getMockUser, getMockUsers } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { render, screen } from '@/utils/test-utils'

import UsersDataGrid from './UsersDataGrid'

jest.mock('@/redux-selectors', () => {
  const originalModule = jest.requireActual('@/redux-selectors')

  return {
    __esModule: true,
    ...originalModule,
    selectUser: jest.fn()
  }
})

describe('#UsersDataGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render every users', () => {
    const mockUser = getMockUser()
    const mockUsers = getMockUsers()

    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<UsersDataGrid users={mockUsers} />)

    const user1Email = screen.getByText('dino.test4962@gmail.com')
    expect(user1Email).toBeInTheDocument()
    const user2Email = screen.getByText('dino.test4963@gmail.com')
    expect(user2Email).toBeInTheDocument()
  })
})
