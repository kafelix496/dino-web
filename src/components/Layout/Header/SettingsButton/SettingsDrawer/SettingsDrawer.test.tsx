import { useState } from 'react'

import { render, screen, fireEvent } from '@/utils/test-utils'

import DinoSettingsDrawer from './SettingsDrawer'

const setup = ({ initialOpenStatus }: { initialOpenStatus: boolean }) => {
  const TestComp = () => {
    const [isSettingsOpen, setSettingsOpen] = useState(initialOpenStatus)

    return (
      <DinoSettingsDrawer
        isSettingsOpen={isSettingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    )
  }

  return {
    TestComp
  }
}

const SELECTED_BUTTON_CLASS = 'MuiButton-contained'
const UNSELECTED_BUTTON_CLASS = 'MuiButton-outlined'

describe('DinoSettingsDrawer component', () => {
  it('should change selected theme mode', () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const lightModeButton = screen.getByText('THEME_MODE_LIGHT')
    fireEvent.click(lightModeButton)
    expect(lightModeButton).toHaveClass(SELECTED_BUTTON_CLASS)
    expect(lightModeButton).not.toHaveClass(UNSELECTED_BUTTON_CLASS)

    const darkModeButton = screen.getByText('THEME_MODE_DARK')
    fireEvent.click(darkModeButton)
    expect(lightModeButton).not.toHaveClass(SELECTED_BUTTON_CLASS)
    expect(lightModeButton).toHaveClass(UNSELECTED_BUTTON_CLASS)
    expect(darkModeButton).toHaveClass(SELECTED_BUTTON_CLASS)
    expect(darkModeButton).not.toHaveClass(UNSELECTED_BUTTON_CLASS)
  })

  it('should change selected locale', () => {
    const { TestComp } = setup({ initialOpenStatus: true })

    render(<TestComp />)

    const englishLocaleButton = screen.getByText('LOCALE_EN')
    fireEvent.click(englishLocaleButton)
    expect(englishLocaleButton).toHaveClass(SELECTED_BUTTON_CLASS)
    expect(englishLocaleButton).not.toHaveClass(UNSELECTED_BUTTON_CLASS)

    const koreanLocaleButton = screen.getByText('LOCALE_KR')
    fireEvent.click(koreanLocaleButton)
    expect(englishLocaleButton).not.toHaveClass(SELECTED_BUTTON_CLASS)
    expect(englishLocaleButton).toHaveClass(UNSELECTED_BUTTON_CLASS)
    expect(koreanLocaleButton).toHaveClass(SELECTED_BUTTON_CLASS)
    expect(koreanLocaleButton).not.toHaveClass(UNSELECTED_BUTTON_CLASS)
  })
})
