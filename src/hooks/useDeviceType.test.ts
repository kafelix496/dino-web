import { DeviceType } from '@/constants/app'
import { renderHook } from '@/utils/testing-library'

import { useDeviceType } from './useDeviceType'

describe('#useDeviceType', () => {
  it('should return device type', () => {
    const { result } = renderHook(() => useDeviceType())

    // it's probably always DESKTOP because
    // running tests on other devices doesn't make sense.
    expect(result.current.deviceType).toBe(DeviceType.DESKTOP)
  })
})
