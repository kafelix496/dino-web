import { useState } from 'react'

import { fireEvent, render, screen } from '@/utils/test-utils'

import DinoSettingsButton from './SettingsButton'

const setup = () => {
  const TestComp = () => {
    const [isSettingsOpen, setSettingsOpen] = useState(false)

    return (
      <>
        <DinoSettingsButton setSettingsOpen={setSettingsOpen} />
        <div data-testid="settings-open-status">{String(isSettingsOpen)}</div>
      </>
    )
  }

  return { TestComp }
}

describe('DinoSettingsButton component', () => {
  it('should set settings open status true when the user clicks settings button', () => {
    const { TestComp } = setup()

    render(<TestComp />)

    const settingsButton = screen.getByLabelText('TOGGLE_SETTINGS_DRAWER')
    const settingsOpenStatus = screen.getByTestId('settings-open-status')
    expect(settingsOpenStatus.innerHTML).toBe('false')
    fireEvent.click(settingsButton)
    expect(settingsOpenStatus.innerHTML).toBe('true')
    fireEvent.click(settingsButton)
    expect(settingsOpenStatus.innerHTML).toBe('true')
  })
})
