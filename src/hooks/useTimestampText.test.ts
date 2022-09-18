import { renderHook } from '@/utils/testing-library'

import { useCreatedAtText, useUpdatedAtText } from './useTimestampText'

describe('#useCreatedAtText', () => {
  it('should convert client timezone time with created at text', () => {
    const { result } = renderHook(() =>
      useCreatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current.createdAtText).toBe(
      'CREATED_AT: Aug.12.2022 02:15 pm'
    )
  })
})

describe('#useUpdatedAtText', () => {
  it('should convert client timezone time with updated at text', () => {
    const { result } = renderHook(() =>
      useUpdatedAtText('2022-08-12T14:15:22.178Z')
    )

    expect(result.current.updatedAtText).toBe(
      'UPDATED_AT: Aug.12.2022 02:15 pm'
    )
  })
})
