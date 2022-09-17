import { useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@mui/material/LinearProgress'

import { resetPostUploadStatus } from '@/redux-actions'
import { selectPostUploadProgress } from '@/redux-selectors'

export const PostFormDialogProgressBar: FC = () => {
  const progress = useSelector(selectPostUploadProgress)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetPostUploadStatus())
    }
  }, [dispatch])

  if (Number.isNaN(progress)) {
    return <></>
  }

  return <LinearProgress variant="determinate" value={progress} />
}
