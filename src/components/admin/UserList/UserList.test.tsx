import adminUserHttpService from '@/http-services/adminUser'
import { getMockUser, getMockUsers } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { act, render, screen } from '@/utils/testing-library'

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

  it('should render every users', async () => {
    const mockUser = getMockUser()
    const mockUsers = getMockUsers()

    ;(selectUser as jest.Mock).mockReturnValue(mockUser)
    jest
      .spyOn(adminUserHttpService, 'getUsers')
      .mockReturnValue(Promise.resolve(mockUsers))

    await act(async () => {
      render(<UserList />)
    })

    const user1Email = screen.getByText('dino.test4962@gmail.com')
    expect(user1Email).toBeInTheDocument()
    const user2Email = screen.getByText('dino.test4963@gmail.com')
    expect(user2Email).toBeInTheDocument()
  })
})
