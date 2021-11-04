import { render, screen } from '@/react-testing-library'

import Todo from '@/pages/todo/index'

describe('Todo', () => {
  it('should render buttons', () => {
    render(<Todo />)

    const addTodoBtn = screen.getByRole('button', {
      name: /ADD_TODO/
    })

    expect(addTodoBtn).toBeInTheDocument()
  })
})
