import { useDispatch } from 'react-redux'

import { setSettingNavOpenStatus } from '@/redux-actions'
import { fireEvent, render, screen } from '@/utils/testing-library'

import SettingsDrawer from './SettingsDrawer'

const setup = () => {
  const TestComponent = () => {
    const dispatch = useDispatch()

    dispatch(setSettingNavOpenStatus(true))

    return <SettingsDrawer />
  }

  return { TestComponent }
}

const SELECTED_BUTTON_CLASS = 'MuiButton-contained'
const UNSELECTED_BUTTON_CLASS = 'MuiButton-outlined'

describe('SettingsDrawer component', () => {
  it('should change selected theme mode', () => {
    const { TestComponent } = setup()

    render(<TestComponent />)

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
    const { TestComponent } = setup()

    render(<TestComponent />)

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
