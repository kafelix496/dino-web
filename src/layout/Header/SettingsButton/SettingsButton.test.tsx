import { useState } from 'react'

import { fireEvent, render, screen } from '@/utils/testing-library'

import SettingsButton from './SettingsButton'

const setup = () => {
  const TestComponent = () => {
    const [isSettingsOpen, setSettingsOpen] = useState(false)

    return (
      <>
        <SettingsButton setSettingsOpen={setSettingsOpen} />
        <div data-testid="settings-open-status">{String(isSettingsOpen)}</div>
      </>
    )
  }

  return { TestComponent }
}

describe('SettingsButton component', () => {
  it('should set settings open status true when the user clicks settings button', () => {
    const { TestComponent } = setup()

    render(<TestComponent />)

    const settingsButton = screen.getByLabelText('TOGGLE_SETTINGS_DRAWER')
    const settingsOpenStatus = screen.getByTestId('settings-open-status')
    expect(settingsOpenStatus.innerHTML).toBe('false')
    fireEvent.click(settingsButton)
    expect(settingsOpenStatus.innerHTML).toBe('true')
    fireEvent.click(settingsButton)
    expect(settingsOpenStatus.innerHTML).toBe('true')
  })
})
