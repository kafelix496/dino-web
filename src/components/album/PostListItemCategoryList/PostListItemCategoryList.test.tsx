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

  it('should render alphabetically', () => {
    ;(usePostPageQueryParams as jest.Mock).mockReturnValue({
      patch: jest.fn()
    })

    const categories = [
      {
        _id: '3333',
        name: '3333_NAME'
      },
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

    screen.queryAllByText(/\d\d\d\d_NAME/).forEach((htmlElement, index) => {
      if (index === 0) {
        expect(htmlElement).toHaveTextContent('1111_NAME')
      }
      if (index === 1) {
        expect(htmlElement).toHaveTextContent('2222_NAME')
      }
      if (index === 2) {
        expect(htmlElement).toHaveTextContent('3333_NAME')
      }
    })
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
