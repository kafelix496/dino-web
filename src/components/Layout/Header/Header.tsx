import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import type { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import AuthStatusButton from './AuthStatusButton/AuthStatusButton'
import PaletteModeButton from './PaletteModeButton/PaletteModeButton'

import type { FC } from 'react'

const CustomizedHeader = styled(({ className, ...props }: PaperProps) => (
  <Paper {...props} component="header" classes={{ root: className }} />
))(
  ({ theme }) => `
  &.MuiPaper-root {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid ${theme.palette.secondary.main};
    height: ${theme.spacing(8)};
    padding: ${theme.spacing(0)} ${theme.spacing(2)};
  }
`
)

const Header: FC = () => {
  return (
    <CustomizedHeader elevation={0} square={true}>
      <AuthStatusButton />

      <Box sx={{ ml: 2 }}>
        <PaletteModeButton />
      </Box>
    </CustomizedHeader>
  )
}

export default Header
