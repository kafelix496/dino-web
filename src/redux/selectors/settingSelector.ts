import { useSelector } from 'react-redux'

import type { State } from '@/redux-types'

export const usePaletteMode = () => {
  const paletteMode = useSelector((state: State) => state.settings.paletteMode)

  return paletteMode
}

export const useLocale = () => {
  const locale = useSelector((state: State) => state.settings.locale)

  return locale
}
