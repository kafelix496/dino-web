import { useMemo } from 'react'

import { createTheme } from '@mui/material'
import type { Theme } from '@mui/material'
import { grey, indigo } from '@mui/material/colors'

const useTheme = ({
  isDarkMode
}: {
  isDarkMode: boolean
}): { theme: Theme } => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: { main: isDarkMode ? indigo[400] : indigo[600] },
          secondary: { main: isDarkMode ? grey[300] : grey[700] }
        },
        typography: {
          fontFamily: 'Lato'
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 420,
            md: 768,
            lg: 1080,
            xl: 1536
          }
        },
        components: {
          MuiTooltip: {
            defaultProps: {
              enterDelay: 300,
              componentsProps: {
                tooltip: { sx: { fontSize: '0.8rem', fontWeight: 'bold' } }
              }
            }
          }
        }
      }),
    [isDarkMode]
  )

  return { theme }
}

export default useTheme
