import { useRouter } from 'next/router'

import { renderHook } from '@/utils/testing-library'

import { usePostPageQueryParams } from './usePostPageQueryParams'

describe('#usePostPageQueryParams', () => {
  describe('#postPageQueryParams', () => {
    it('should return current query params form post qpPage query params', () => {
      const mockRouter = {
        query: { qpPage: '2', qpCategoryId: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

      const { result } = renderHook(() => usePostPageQueryParams())

      expect(result.current.postPageQueryParams).toEqual({
        qpPage: 2,
        qpCategoryId: 'FAKE_CATEGORY',
        qpAssetId: undefined
      })
    })

    it('should return 1 if qpPage is invalid query param', () => {
      const mockRouter = {
        query: { query: 'INVALID', qpCategoryId: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

      const { result } = renderHook(() => usePostPageQueryParams())

      expect(result.current.postPageQueryParams).toEqual({
        qpPage: 1,
        qpCategoryId: 'FAKE_CATEGORY',
        qpAssetId: undefined
      })
    })
  })

  describe('#patch', () => {
    it('should patch with qpPage: 1 if qpPage parameter is invalid', () => {
      const mockRouter = {
        query: { qpCategoryId: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

      const { result } = renderHook(() => usePostPageQueryParams())

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({ qpPage: -1, qpAssetId: 'FAKE_ASSET' })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        {
          query: {
            qpCategoryId: 'FAKE_CATEGORY',
            qpAssetId: 'FAKE_ASSET'
          }
        },
        undefined,
        { shallow: true }
      )
    })

    it('should patch query param depending on parameters', () => {
      const mockRouter = {
        query: { qpCategoryId: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

      const { result } = renderHook(() => usePostPageQueryParams())

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({ qpPage: 2, qpAssetId: 'FAKE_ASSET' })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        {
          query: {
            qpPage: '2',
            qpCategoryId: 'FAKE_CATEGORY',
            qpAssetId: 'FAKE_ASSET'
          }
        },
        undefined,
        { shallow: true }
      )
    })

    it('should remove query param if value is null', () => {
      const mockRouter = {
        query: { qpCategoryId: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

      const { result } = renderHook(() => usePostPageQueryParams())

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({
        qpPage: 2,
        qpCategoryId: null,
        qpAssetId: 'FAKE_ASSET'
      })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        { query: { qpPage: '2', qpAssetId: 'FAKE_ASSET' } },
        undefined,
        { shallow: true }
      )
    })
  })
})
