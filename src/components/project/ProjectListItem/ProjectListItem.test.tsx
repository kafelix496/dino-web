import { Apps } from '@/constants/app'
import { fireEvent, render, screen } from '@/utils/testing-library'

import ProjectListItem from './ProjectListItem'

const setup = () => {
  return {
    id: 'TEST_ID',
    title: 'TEST_TITLE',
    description: 'TEST_DESCRIPTION'
  }
}

describe('ProjectListItem component', () => {
  it('should render title', () => {
    const { id, title } = setup()

    render(
      <ProjectListItem
        appAbbreviation={Apps.moneyTracker}
        id={id}
        title={title}
        createdAt=""
        updatedAt=""
      />
    )

    const projectItemTitle = screen.getByText(title)
    expect(projectItemTitle).toBeInTheDocument()
  })

  it('should render tooltip if you put your mouse over the title', async () => {
    const { id, title } = setup()

    render(
      <ProjectListItem
        appAbbreviation={Apps.moneyTracker}
        id={id}
        title={title}
        createdAt=""
        updatedAt=""
      />
    )

    const projectItemTitle = screen.getByText(title)
    expect(projectItemTitle).toBeInTheDocument()
    fireEvent.mouseOver(projectItemTitle)
    const projectItemTooltip = await screen.findByRole('tooltip')
    expect(projectItemTooltip).toBeInTheDocument()
  })
})
