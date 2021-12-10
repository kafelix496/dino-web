import type { Theme } from '@mui/material'

export const useHeaderButtonColor = () => (theme: Theme) =>
  theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
