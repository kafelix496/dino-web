import { renderHook } from '@/utils/testing-library'

import { useCreatedAtText, useUpdatedAtText } from './useTimestampText'

describe('#useCreatedAtText', () => {
  it('should return false if the user is not logged in', () => {
    const { result } = renderHook(() =>
      useCreatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current).toBe('CREATED_AT: 08/12/2022 10:15 am')
  })
})

describe('#useUpdatedAtText', () => {
  it('should return false if the user is not logged in', () => {
    const { result } = renderHook(() =>
      useUpdatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current).toBe('UPDATED_AT: 08/12/2022 10:15 am')
  })
})
