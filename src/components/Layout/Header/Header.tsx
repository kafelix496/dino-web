import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import DinoAuthStatusButton from './AuthStatusButton/AuthStatusButton'
import DinoPaletteModeButton from './PaletteModeButton/PaletteModeButton'

const DinoHeader: FC = () => {
  return (
    <Paper
      className="__d-flex __d-justify-end __d-items-center"
      elevation={0}
      square={true}
      component="header"
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        height: theme.spacing(8),
        padding: `${theme.spacing(0)} ${theme.spacing(2)}`
      })}
    >
      <Link href="/">
        <Box
          className="__d-cursor-pointer __d-relative __d-h-full"
          sx={{ width: (theme) => theme.spacing(10) }}
        >
          <Image src="/logo.png" layout="fill" />
        </Box>
      </Link>
      <Box className="__d-grow __d-flex __d-justify-end">
        <DinoAuthStatusButton />

        <Box sx={{ ml: 2 }}>
          <DinoPaletteModeButton />
        </Box>
      </Box>
    </Paper>
  )
}

export default DinoHeader
