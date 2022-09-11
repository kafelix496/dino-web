import {
  POST_ASSET_DESKTOP_WIDTH,
  POST_ASSET_MAX_WIDTH,
  POST_ASSET_MOBILE_WIDTH,
  POST_ASSET_TABLET_WIDTH
} from '@/constants/album'
import { DeviceType } from '@/constants/app'

import { useDeviceType } from './useDeviceType'

export const useAlbumAssetMaxWidth = () => {
  const { deviceType } = useDeviceType()

  if (deviceType === DeviceType.DESKTOP) {
    return { width: POST_ASSET_DESKTOP_WIDTH }
  }

  if (deviceType === DeviceType.TABLET) {
    return { width: POST_ASSET_TABLET_WIDTH }
  }

  if (deviceType === DeviceType.MOBILE) {
    return { width: POST_ASSET_MOBILE_WIDTH }
  }

  return { width: POST_ASSET_MAX_WIDTH }
}
