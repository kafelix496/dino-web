import { useIsAdminOrAbove } from '@/hooks/useIsAdmin'
import adminUserHttpService from '@/http-services/adminUser'
import { getMockUsers } from '@/mock-data/user.mockData'
import { act, render, screen } from '@/utils/testing-library'

import { UserList } from './UserList'

jest.mock('@/hooks/useIsAdmin', () => {
  const originalModule = jest.requireActual('@/hooks/useIsAdmin')

  return {
    __esModule: true,
    ...originalModule,
    useIsAdminOrAbove: jest.fn()
  }
})

const setup = ({ isAdminOrAbove }: { isAdminOrAbove: boolean }) => {
  const TestComponent = () => {
    ;(useIsAdminOrAbove as jest.Mock).mockReturnValue({
      isAdminOrAbove
    })

    return <UserList />
  }

  return { TestComponent }
}

describe('#UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render users if user is not admin or above', async () => {
    const { TestComponent } = setup({ isAdminOrAbove: false })
    const mockUsers = getMockUsers()

    jest
      .spyOn(adminUserHttpService, 'getUsers')
      .mockReturnValue(Promise.resolve(mockUsers))

    await act(async () => {
      render(<TestComponent />)
    })

    const user1Email = screen.queryByText('dino.test4962@gmail.com')
    expect(user1Email).not.toBeInTheDocument()
    const user2Email = screen.queryByText('dino.test4963@gmail.com')
    expect(user2Email).not.toBeInTheDocument()
  })

  it('should render every users if user is super admin', async () => {
    const { TestComponent } = setup({ isAdminOrAbove: true })
    const mockUsers = getMockUsers()

    jest
      .spyOn(adminUserHttpService, 'getUsers')
      .mockReturnValue(Promise.resolve(mockUsers))

    await act(async () => {
      render(<TestComponent />)
    })

    const user1Email = screen.getByText('dino.test4962@gmail.com')
    expect(user1Email).toBeInTheDocument()
    const user2Email = screen.getByText('dino.test4963@gmail.com')
    expect(user2Email).toBeInTheDocument()
  })
})
