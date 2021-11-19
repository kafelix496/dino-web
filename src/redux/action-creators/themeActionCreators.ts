import { ActionType } from '@/redux-types/theme'

import type { Dispatch } from 'redux'
import type { Action } from '@/redux-types/theme'

export const togglePaletteMode = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TOGGLE_PALETTE_MODE
    })
  }
}
