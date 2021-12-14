import { render, screen } from '@testing-library/react'

import ProjectItem from './ProjectItem'

const setup = () => {
  return {
    title: 'TEST_TITLE',
    subTitle: 'TEST_SUBTITLE',
    description: 'TEST_DESCRIPTION'
  }
}

describe('ProjectItem component', () => {
  it('should render title and sub title', () => {
    const { title, subTitle } = setup()

    render(<ProjectItem title={title} subTitle={subTitle} />)

    const projectItemTitle = screen.getByText(title)
    expect(projectItemTitle).toBeInTheDocument()

    const projectItemSubTitle = screen.getByText(subTitle)
    expect(projectItemSubTitle).toBeInTheDocument()
  })

  it("should not render description if you don't pass description", () => {
    const { title, subTitle, description } = setup()

    render(<ProjectItem title={title} subTitle={subTitle} />)

    const projectItemDescription = screen.queryByText(description)
    expect(projectItemDescription).not.toBeInTheDocument()
  })

  it('should render description if you pass description', () => {
    const { title, subTitle, description } = setup()

    render(
      <ProjectItem
        title={title}
        subTitle={subTitle}
        description={description}
      />
    )

    const projectItemDescription = screen.queryByText(description)
    expect(projectItemDescription).toBeInTheDocument()
  })
})
