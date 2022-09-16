import { fireEvent, render, screen } from '@testing-library/react'

import PostPageMoveButtons from './PostPageMoveButtons'

describe('#PostPageMoveButtons', () => {
  it('should render anything if current page is smaller than 1', () => {
    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={0}
        totalPage={1}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.queryByText('BUTTON_PREV')).toBeNull()
    expect(screen.queryByText('BUTTON_NEXT')).toBeNull()
  })

  it('should render anything if current page is bigger than total page', () => {
    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={2}
        totalPage={1}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.queryByText('BUTTON_PREV')).toBeNull()
    expect(screen.queryByText('BUTTON_NEXT')).toBeNull()
  })

  test('if prev button and next button are disabled if isLoading is true', () => {
    render(
      <PostPageMoveButtons
        isLoading={true}
        currentPage={1}
        totalPage={2}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.getByText('BUTTON_PREV')).toHaveClass('Mui-disabled')
    expect(screen.getByText('BUTTON_NEXT')).toHaveClass('Mui-disabled')
  })

  test('prev button is disabled if currentPage is 1', () => {
    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={1}
        totalPage={2}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.getByText('BUTTON_PREV')).toHaveClass('Mui-disabled')
    expect(screen.getByText('BUTTON_NEXT')).not.toHaveClass('Mui-disabled')
  })

  test('next button is disabled if currentPage is equal to totalPage', () => {
    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={2}
        totalPage={2}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.getByText('BUTTON_PREV')).not.toHaveClass('Mui-disabled')
    expect(screen.getByText('BUTTON_NEXT')).toHaveClass('Mui-disabled')
  })

  test('prev button and next button are disabled if totalPage is less than 1 or equal to 1', () => {
    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={1}
        totalPage={1}
        goPrevPage={jest.fn()}
        goNextPage={jest.fn()}
      />
    )

    expect(screen.getByText('BUTTON_PREV')).toHaveClass('Mui-disabled')
    expect(screen.getByText('BUTTON_NEXT')).toHaveClass('Mui-disabled')
  })

  it('should call goPrevPage is prev button is clicked', () => {
    const goPrevPage = jest.fn()
    const goNextPage = jest.fn()

    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={2}
        totalPage={4}
        goPrevPage={goPrevPage}
        goNextPage={goNextPage}
      />
    )

    expect(goPrevPage).not.toHaveBeenCalled()
    expect(goNextPage).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('BUTTON_PREV'))
    expect(goPrevPage).toHaveBeenCalled()
    expect(goNextPage).not.toHaveBeenCalled()
  })

  it('should call goNextPage is next button is clicked', () => {
    const goPrevPage = jest.fn()
    const goNextPage = jest.fn()

    render(
      <PostPageMoveButtons
        isLoading={false}
        currentPage={2}
        totalPage={4}
        goPrevPage={goPrevPage}
        goNextPage={goNextPage}
      />
    )

    expect(goPrevPage).not.toHaveBeenCalled()
    expect(goNextPage).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('BUTTON_NEXT'))
    expect(goPrevPage).not.toHaveBeenCalled()
    expect(goNextPage).toHaveBeenCalled()
  })
})
