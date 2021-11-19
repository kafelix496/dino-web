export type PaletteModeType = 'light' | 'dark'

export interface State {
  paletteMode: PaletteModeType
}

export enum ActionType {
  TOGGLE_PALETTE_MODE = 'toggle_palette_mode'
}

export interface togglePaletteModeAction {
  type: ActionType.TOGGLE_PALETTE_MODE
}

export type Action = togglePaletteModeAction
