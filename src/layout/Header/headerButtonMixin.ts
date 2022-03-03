import type { Theme } from '@mui/material'

const headerButtonMixin = (theme: Theme) =>
  theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main

export default headerButtonMixin
