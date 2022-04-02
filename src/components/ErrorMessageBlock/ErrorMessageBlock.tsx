import type { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ErrorMessageBlockProps {
  message: string
}

const ErrorMessageBlock: FC<ErrorMessageBlockProps> = ({ message }) => {
  return (
    <Box className="__d-w-full __d-h-full __d-flex __d-justify-center __d-items-center">
      <Typography variant="h6">{message}</Typography>
    </Box>
  )
}

export default ErrorMessageBlock
