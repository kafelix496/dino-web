import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { AccessLevels, Apps } from '@/constants/app'
import { getMockUser } from '@/mock-data/user.mockData'
import { setUser } from '@/redux-actions'
import { renderHook } from '@/utils/testing-library'

import { useUserAccessLevel } from './useUserAccessLevel'

describe('#useUserAccessLevel', () => {
  it('should return AccessLevels.NONE if "appAbbreviation" query is invalid', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { appAbbreviation: 'INVALID' }
    })

    const { result } = renderHook(() => useUserAccessLevel())

    expect(result.current).toEqual({
      userAccessLevel: AccessLevels.NONE
    })
  })

  it('should return AccessLevels.NONE if user is not valid', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { appAbbreviation: Apps.familyAlbum }
    })

    const { result } = renderHook(() => useUserAccessLevel())

    expect(result.current.userAccessLevel).toBe(AccessLevels.NONE)
  })

  it("should return user's AccessLevels", () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { appAbbreviation: Apps.familyAlbum }
    })
    const mockUser = getMockUser()
    mockUser.accessLevel[Apps.familyAlbum] = AccessLevels.EDITOR

    const { result } = renderHook(() => {
      const dispatch = useDispatch()

      dispatch(setUser(mockUser))

      return useUserAccessLevel()
    })

    expect(result.current.userAccessLevel).toBe(AccessLevels.EDITOR)
  })
})
