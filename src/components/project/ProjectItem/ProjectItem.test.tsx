import { Apps } from '@/constants/app'
import { fireEvent, render, screen } from '@/utils/testing-library'

import ProjectItem from './ProjectItem'

const setup = () => {
  return {
    id: 'TEST_ID',
    title: 'TEST_TITLE',
    subTitle: 'TEST_SUBTITLE',
    tooltip: 'TEST_TOOPTIP',
    description: 'TEST_DESCRIPTION'
  }
}

describe('ProjectItem component', () => {
  it('should render title and sub title', () => {
    const { id, title, subTitle, tooltip } = setup()

    render(
      <ProjectItem
        appAbbreviation={Apps.moneyTracker}
        id={id}
        title={title}
        subTitle={subTitle}
        tooltip={tooltip}
      />
    )

    const projectItemTitle = screen.getByText(title)
    expect(projectItemTitle).toBeInTheDocument()

    const projectItemSubTitle = screen.getByText(subTitle)
    expect(projectItemSubTitle).toBeInTheDocument()
  })

  it('should render tooltip if you put your mouse over the title', async () => {
    const { id, title, subTitle, tooltip } = setup()

    render(
      <ProjectItem
        appAbbreviation={Apps.moneyTracker}
        id={id}
        title={title}
        subTitle={subTitle}
        tooltip={tooltip}
      />
    )

    const projectItemTitle = screen.getByText(title)
    expect(projectItemTitle).toBeInTheDocument()
    fireEvent.mouseOver(projectItemTitle)
    const projectItemTooltip = await screen.findByText(tooltip)
    expect(projectItemTooltip).toBeInTheDocument()
  })
})
