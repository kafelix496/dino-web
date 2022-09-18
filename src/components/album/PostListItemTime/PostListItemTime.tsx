import type { FC } from 'react'

import Typography from '@mui/material/Typography'

import { convertTime } from '@/utils/app'

export interface PostListItemTimeProps {
  createdAt: string
}

export const PostListItemTime: FC<PostListItemTimeProps> = ({ createdAt }) => {
  return (
    <Typography variant="caption">{convertTime.dbToJs(createdAt)}</Typography>
  )
}
