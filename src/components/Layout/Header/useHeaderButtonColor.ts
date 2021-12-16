import type { Theme } from '@mui/material'

const useDinoHeaderButtonColor = () => (theme: Theme) =>
  theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main

export default useDinoHeaderButtonColor
