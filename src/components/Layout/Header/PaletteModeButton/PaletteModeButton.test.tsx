import { render, screen, fireEvent } from '@/utils/test-utils'

import DinoPaletteModeButton from './PaletteModeButton'

import { togglePaletteMode } from '@/redux-action-creators'

describe('DinoPaletteModeButton component', () => {
  it('should render a palette mode button', () => {
    render(<DinoPaletteModeButton />)

    const paletteModeButton = screen.getByTestId('palette-mode-button')
    expect(paletteModeButton).toBeInTheDocument()
    fireEvent.click(paletteModeButton)
    expect(togglePaletteMode).toHaveBeenCalled()
  })
})
