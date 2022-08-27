import { useRouter } from 'next/router'

import { renderHook } from '@/utils/testing-library'

import { usePostPageQueryParams } from './usePostPageQueryParams'

describe('#usePostPageQueryParams', () => {
  describe('#postPageQueryParams', () => {
    it('should return current query params form post page query params', () => {
      const mockRouter = {
        query: { page: '2', category: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      const { result } = renderHook(() => {
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

        return usePostPageQueryParams()
      })

      expect(result.current.postPageQueryParams).toEqual({
        page: 2,
        category: 'FAKE_CATEGORY',
        asset: undefined
      })
    })

    it('should return 1 if page is invalid query param', () => {
      const mockRouter = {
        query: { query: 'INVALID', category: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      const { result } = renderHook(() => {
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

        return usePostPageQueryParams()
      })

      expect(result.current.postPageQueryParams).toEqual({
        page: 1,
        category: 'FAKE_CATEGORY',
        asset: undefined
      })
    })
  })

  describe('#patch', () => {
    it('should patch with page: 1 if page parameter is invalid', () => {
      const mockRouter = {
        query: { category: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      const { result } = renderHook(() => {
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

        return usePostPageQueryParams()
      })

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({ page: -1, asset: 'FAKE_ASSET' })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        { query: { page: 1, category: 'FAKE_CATEGORY', asset: 'FAKE_ASSET' } },
        undefined,
        { shallow: true }
      )
    })

    it('should patch query param depending on parameters', () => {
      const mockRouter = {
        query: { category: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      const { result } = renderHook(() => {
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

        return usePostPageQueryParams()
      })

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({ page: 2, asset: 'FAKE_ASSET' })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        {
          query: { page: '2', category: 'FAKE_CATEGORY', asset: 'FAKE_ASSET' }
        },
        undefined,
        { shallow: true }
      )
    })

    it('should remove query param if value is null', () => {
      const mockRouter = {
        query: { category: 'FAKE_CATEGORY' },
        replace: jest.fn()
      }
      const { result } = renderHook(() => {
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

        return usePostPageQueryParams()
      })

      expect(mockRouter.replace).not.toHaveBeenCalled()
      result.current.patch({ page: 2, category: null, asset: 'FAKE_ASSET' })
      expect(mockRouter.replace).toHaveBeenCalledWith(
        { query: { page: '2', asset: 'FAKE_ASSET' } },
        undefined,
        { shallow: true }
      )
    })
  })
})
