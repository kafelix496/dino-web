import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'
import { fireEvent, render, screen } from '@/utils/testing-library'

import { PostListItemCategoryList } from './PostListItemCategoryList'

jest.mock('@/hooks/usePostPageQueryParams')

describe('#PostListItemCategoryList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render category"s name', () => {
    ;(usePostPageQueryParams as jest.Mock).mockReturnValue({
      patch: jest.fn()
    })

    const categories = [
      {
        _id: '1111',
        name: '1111_NAME'
      },
      {
        _id: '2222',
        name: '2222_NAME'
      }
    ]

    render(<PostListItemCategoryList categories={categories} />)

    expect(screen.queryByText('1111_NAME')).toBeInTheDocument()
    expect(screen.queryByText('2222_NAME')).toBeInTheDocument()
  })

  it('should patch qpCategoryId if the item is clicked', () => {
    const mockPatch = jest.fn()
    ;(usePostPageQueryParams as jest.Mock).mockReturnValue({
      patch: mockPatch
    })

    const categories = [
      {
        _id: '1111',
        name: '1111_NAME'
      },
      {
        _id: '2222',
        name: '2222_NAME'
      }
    ]

    render(<PostListItemCategoryList categories={categories} />)

    expect(mockPatch).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('1111_NAME'))
    expect(mockPatch).toHaveBeenCalledWith({ qpPage: 1, qpCategoryId: '1111' })
    fireEvent.click(screen.getByText('2222_NAME'))
    expect(mockPatch).toHaveBeenCalledWith({ qpPage: 1, qpCategoryId: '2222' })
  })
})
