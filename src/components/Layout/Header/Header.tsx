import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import type { PaperProps } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import DinoAuthStatusButton from './AuthStatusButton/AuthStatusButton'
import DinoPaletteModeButton from './PaletteModeButton/PaletteModeButton'

import type { FC } from 'react'

const DinoStyledHeader = styled(({ className, ...props }: PaperProps) => (
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

const DinoHeader: FC = () => {
  return (
    <DinoStyledHeader elevation={0} square={true}>
      <DinoAuthStatusButton />

      <Box sx={{ ml: 2 }}>
        <DinoPaletteModeButton />
      </Box>
    </DinoStyledHeader>
  )
}

export default DinoHeader
