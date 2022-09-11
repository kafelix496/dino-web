import {
  POST_ASSET_DESKTOP_WIDTH,
  POST_ASSET_MAX_WIDTH,
  POST_ASSET_MOBILE_WIDTH,
  POST_ASSET_TABLET_WIDTH
} from '@/constants/album'
import { DeviceType } from '@/constants/app'
import { renderHook } from '@/utils/testing-library'

import { useAlbumAssetMaxWidth } from './useAlbumAssetMaxWidth'
import { useDeviceType } from './useDeviceType'

jest.mock('./useDeviceType')

describe('#useAlbumAssetMaxWidth', () => {
  it('should return post asset desktop width if device type is desktop', () => {
    ;(useDeviceType as jest.Mock).mockImplementation(() => ({
      deviceType: DeviceType.DESKTOP
    }))

    const { result } = renderHook(() => useAlbumAssetMaxWidth())

    expect(result.current.width).toBe(POST_ASSET_DESKTOP_WIDTH)
  })

  it('should return post asset tablet width if device type is tablet', () => {
    ;(useDeviceType as jest.Mock).mockImplementation(() => ({
      deviceType: DeviceType.TABLET
    }))

    const { result } = renderHook(() => useAlbumAssetMaxWidth())

    expect(result.current.width).toBe(POST_ASSET_TABLET_WIDTH)
  })

  it('should return post asset mobile width if device type is mobile', () => {
    ;(useDeviceType as jest.Mock).mockImplementation(() => ({
      deviceType: DeviceType.MOBILE
    }))

    const { result } = renderHook(() => useAlbumAssetMaxWidth())

    expect(result.current.width).toBe(POST_ASSET_MOBILE_WIDTH)
  })

  it('should return post asset max width if device type not valid', () => {
    ;(useDeviceType as jest.Mock).mockImplementation(() => ({
      deviceType: null
    }))

    const { result } = renderHook(() => useAlbumAssetMaxWidth())

    expect(result.current.width).toBe(POST_ASSET_MAX_WIDTH)
  })
})
