import { useMemo } from 'react'

import { createTheme } from '@mui/material'
import { indigo, grey } from '@mui/material/colors'

import type { Theme } from '@mui/material'
import type { PaletteModeType } from '@/redux-types/theme'

export default function useTheme({ paletteMode }: { paletteMode: PaletteModeType }): {
  theme: Theme
} {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          primary: indigo,
          secondary: grey,
          bgHoverDim:
            paletteMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
        },
        typography: {
          fontFamily: 'Lato'
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 360,
            md: 768,
            lg: 1080,
            xl: 1536
          }
        }
      }),
    [paletteMode]
  )

  return { theme }
}
