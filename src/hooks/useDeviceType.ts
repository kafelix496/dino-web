import DeviceDetector from 'device-detector-js'

import { DeviceType } from '@/constants/app'
import { isServer } from '@/utils/app'

export const useDeviceType = (): { deviceType: DeviceType | null } => {
  if (isServer()) {
    return { deviceType: null }
  }

  const deviceDetector = new DeviceDetector()
  const userAgent = navigator.userAgent

  switch (deviceDetector.parse(userAgent).device?.type) {
    case DeviceType.DESKTOP: {
      return { deviceType: DeviceType.DESKTOP }
    }

    case DeviceType.TABLET: {
      return { deviceType: DeviceType.TABLET }
    }

    case DeviceType.MOBILE: {
      return { deviceType: DeviceType.MOBILE }
    }

    default: {
      return { deviceType: null }
    }
  }
}
