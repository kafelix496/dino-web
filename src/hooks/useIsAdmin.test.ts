import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { AccessLevels, Apps } from '@/constants/app'
import { getMockUser } from '@/mock-data/user.mockData'
import { setUser } from '@/redux-actions'
import { renderHook } from '@/utils/testing-library'

import { useIsAdminOrAbove, useIsSuperAdmin } from './useIsAdmin'

enum SetupType {
  useIsAdminOrAbove = 'useIsAdminOrAbove',
  useIsSuperAdmin = 'useIsSuperAdmin'
}

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
  accessLevel,
  type
}: {
  isLogin: boolean
  appAbbreviation: unknown
  accessLevel: AccessLevels
  type: SetupType
}) => {
  ;(useRouter as jest.Mock).mockReturnValueOnce({
    query: { appAbbreviation: appAbbreviation }
  })

  const { result } = renderHook(() => {
    const dispatch = useDispatch()
    if (isLogin) {
      const mockUser = getMockUser()
      mockUser.accessLevel[appAbbreviation as Apps] = accessLevel
      dispatch(setUser(mockUser))
    } else {
      dispatch(setUser(null))
    }

    if (type === SetupType.useIsAdminOrAbove) {
      return useIsAdminOrAbove()
    }

    if (type === SetupType.useIsSuperAdmin) {
      return useIsSuperAdmin()
    }

    return
  })

  return result
}

describe('#useIsAdmin', () => {
  describe('#useIsSuperAdmin', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return false if the user is not logged in', () => {
      const result = setup({
        isLogin: false,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsSuperAdmin
      })

      expect(result.current).toEqual({ isSuperAdmin: false })
    })

    it('should return false if the appAbbreviation is not valid', () => {
      const result = setup({
        isLogin: true,
        appAbbreviation: 'fake',
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsSuperAdmin
      })

      expect(result.current).toEqual({ isSuperAdmin: false })
    })

    it('should return false if the user is not super admin', () => {
      const result1 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsSuperAdmin
      })

      expect(result1.current).toEqual({ isSuperAdmin: false })

      const result2 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.EDITOR,
        type: SetupType.useIsSuperAdmin
      })

      expect(result2.current).toEqual({ isSuperAdmin: false })

      const result3 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.ADMIN,
        type: SetupType.useIsSuperAdmin
      })

      expect(result3.current).toEqual({ isSuperAdmin: false })

      const result4 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.SUPER_ADMIN,
        type: SetupType.useIsSuperAdmin
      })

      expect(result4.current).toEqual({ isSuperAdmin: true })
    })
  })

  describe('#useIsAdminOrAbove', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return false if the user is not logged in', () => {
      const result = setup({
        isLogin: false,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result.current).toEqual({ isAdminOrAbove: false })
    })

    it('should return false if the appAbbreviation is not valid', () => {
      const result = setup({
        isLogin: true,
        appAbbreviation: 'fake',
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result.current).toEqual({ isAdminOrAbove: false })
    })

    it('should return false if the user is not admin or super admin', () => {
      const result1 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.NONE,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result1.current).toEqual({ isAdminOrAbove: false })

      const result2 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.EDITOR,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result2.current).toEqual({ isAdminOrAbove: false })

      const result3 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.ADMIN,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result3.current).toEqual({ isAdminOrAbove: true })

      const result4 = setup({
        isLogin: true,
        appAbbreviation: Apps.familyAlbum,
        accessLevel: AccessLevels.SUPER_ADMIN,
        type: SetupType.useIsAdminOrAbove
      })

      expect(result4.current).toEqual({ isAdminOrAbove: true })
    })
  })
})
