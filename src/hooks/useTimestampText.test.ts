import { renderHook } from '@/utils/testing-library'

import { useCreatedAtText, useUpdatedAtText } from './useTimestampText'

describe('#useCreatedAtText', () => {
  it('should convert client timezone time with created at text', () => {
    const { result } = renderHook(() =>
      useCreatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current).toMatch(
      /^CREATED_AT: \d\d\/\d\d\/\d\d\d\d \d\d:\d\d (a|p)m/
    )
  })
})

describe('#useUpdatedAtText', () => {
  it('should convert client timezone time with updated at text', () => {
    const { result } = renderHook(() =>
      useUpdatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current).toMatch(
      /^UPDATED_AT: \d\d\/\d\d\/\d\d\d\d \d\d:\d\d (a|p)m/
    )
  })
})
