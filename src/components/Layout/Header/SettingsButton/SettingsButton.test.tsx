import { render, screen, fireEvent } from '@/utils/test-utils'

import DinoSettingsButton from './SettingsButton'

describe('DinoSettingsButton component', () => {
  it('should render settings drawer when the user clicks settings button', () => {
    render(<DinoSettingsButton />)

    const settingsButton = screen.getByLabelText('TOGGLE_SETTINGS_DRAWER')
    // SETTINGS is the text inside drawer component
    const settingsDrawer = screen.queryByText('SETTINGS')
    expect(settingsButton).toBeInTheDocument()
    expect(settingsDrawer).not.toBeInTheDocument()
    fireEvent.click(settingsButton)
    // SETTINGS is the text inside drawer component
    const settingsDrawer2 = screen.queryByText('SETTINGS')
    expect(settingsDrawer2).toBeInTheDocument()
  })
})
