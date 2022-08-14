import { useRouter } from 'next/router'

import { AccessLevels, Apps } from '@/constants/app'
import { getMockUser } from '@/mock-data/user.mockData'
import { selectUser } from '@/redux-selectors'
import { renderHook } from '@/utils/testing-library'

import { useIsAdmin } from './useIsAdmin'

jest.mock('@/redux-selectors', () => {
  const originalModule = jest.requireActual('@/redux-selectors')

  return {
    __esModule: true,
    ...originalModule,
    selectUser: jest.fn()
  }
})

jest.mock('next/router', () => {
  const originalModule = jest.requireActual('next/router')

  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn()
  }
})

const setup = ({
  isLogin,
  appAbbreviation,
  accessLevel
}: {
  isLogin: boolean
  appAbbreviation: unknown
  accessLevel: AccessLevels
}) => {
  if (isLogin) {
    const mockUser = getMockUser()
    mockUser.accessLevel[appAbbreviation as Apps] = accessLevel
    ;(selectUser as jest.Mock).mockReturnValueOnce(mockUser)
  } else {
    ;(selectUser as jest.Mock).mockReturnValueOnce(null)
  }
  ;(useRouter as jest.Mock).mockReturnValueOnce({
    query: { appAbbreviation: appAbbreviation }
  })

  const { result } = renderHook(() => useIsAdmin())

  return result
}

describe('#useIsAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return false if the user is not logged in', () => {
    const result = setup({
      isLogin: false,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.NONE
    })

    expect(result.current).toBe(false)
  })

  it('should return false if the appAbbreviation is not valid', () => {
    const result = setup({
      isLogin: true,
      appAbbreviation: 'fake',
      accessLevel: AccessLevels.NONE
    })

    expect(result.current).toBe(false)
  })

  it('should return false if the user is not admin or super admin', () => {
    const result1 = setup({
      isLogin: true,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.NONE
    })

    expect(result1.current).toBe(false)

    const result2 = setup({
      isLogin: true,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.EDITOR
    })

    expect(result2.current).toBe(false)

    const result3 = setup({
      isLogin: true,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.ADMIN
    })

    expect(result3.current).toBe(true)

    const result4 = setup({
      isLogin: true,
      appAbbreviation: Apps.familyAlbum,
      accessLevel: AccessLevels.SUPER_ADMIN
    })

    expect(result4.current).toBe(true)
  })
})
