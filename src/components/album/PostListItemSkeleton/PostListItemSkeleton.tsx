import type { FC } from 'react'

import type { Theme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

import { POST_MAX_WIDTH, POST_ROW_HEIGHT } from '@/constants/album'

export const PostListItemSkeleton: FC = () => {
  return (
    <Paper
      sx={[
        (theme: Theme) => ({
          padding: theme.spacing(2),
          marginTop: theme.spacing(4)
        }),
        {
          width: '90%',
          maxWidth: POST_MAX_WIDTH
        }
      ]}
    >
      <Skeleton
        sx={{
          width: '50%',
          height: (theme: Theme) => theme.spacing(3)
        }}
      />
      <Skeleton
        sx={{
          mt: 2,
          width: '50%',
          height: (theme: Theme) => theme.spacing(2)
        }}
      />
      <Skeleton
        sx={{
          mt: 1,
          width: '50%',
          height: (theme: Theme) => theme.spacing(2)
        }}
      />

      <Divider sx={{ mt: 2 }} />

      <Skeleton sx={{ mt: 2, height: (theme: Theme) => theme.spacing(3) }} />

      <Divider sx={{ mt: 2 }} />

      <Skeleton sx={{ mt: 2, height: POST_ROW_HEIGHT * 2 }} />
    </Paper>
  )
}
