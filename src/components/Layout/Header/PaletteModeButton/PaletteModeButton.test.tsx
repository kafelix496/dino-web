import { render, screen, fireEvent } from '@/react-testing-library'

import PaletteModeButton from './PaletteModeButton'

import { togglePaletteMode } from '@/redux-action-creators'

describe('PaletteModeButton component', () => {
  it('should render a palette mode button', () => {
    render(<PaletteModeButton />)

    const paletteModeButton = screen.getByTestId('palette-mode-button')

    expect(paletteModeButton).toBeInTheDocument()
    fireEvent.click(paletteModeButton)
    expect(togglePaletteMode).toHaveBeenCalled()
  })
})
