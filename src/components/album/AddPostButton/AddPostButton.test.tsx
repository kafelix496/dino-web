import { AccessLevels, Apps } from '@/constants/app'
import { getMockUser } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { render, screen } from '@/utils/test-utils'

import AddPostButton from './AddPostButton'

jest.mock('@/redux-selectors', () => {
  const originalModule = jest.requireActual('@/redux-selectors')

  return {
    __esModule: true,
    ...originalModule,
    selectUser: jest.fn(),
    addPost: jest.fn()
  }
})

describe('#AddPostButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render add button component if user's fa permission is super admin", () => {
    const mockUser = getMockUser()

    mockUser.accessLevel[Apps.familyAlbum] = AccessLevels.SUPER_ADMIN
    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<AddPostButton />)

    const mockButtonText = screen.getByText('ALBUM_ADD_POST')
    expect(mockButtonText).toBeInTheDocument()
  })

  it("should render add button component if user's fa permission is admin", () => {
    const mockUser = getMockUser()

    mockUser.accessLevel[Apps.familyAlbum] = AccessLevels.ADMIN
    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<AddPostButton />)

    const mockButtonText = screen.getByText('ALBUM_ADD_POST')
    expect(mockButtonText).toBeInTheDocument()
  })

  it("should render add button component if user's fa permission is not super admin or admin", () => {
    const mockUser = getMockUser()

    mockUser.accessLevel[Apps.familyAlbum] = AccessLevels.EDITOR
    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)

    render(<AddPostButton />)

    const mockButtonText = screen.queryByText('ALBUM_ADD_POST')
    expect(mockButtonText).not.toBeInTheDocument()
  })
})
