import { useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import Alert from '@mui/material/Alert'

import { deleteAlert } from '@/redux-actions'
import type { ToastMessage } from '@/types'

type ToastListItemProps = ToastMessage

const ToastListItem: FC<ToastListItemProps> = ({ id, severity, message }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteAlert(id))
    }, 3000)
  }, [dispatch, id])

  return (
    <Alert variant="outlined" elevation={6} severity={severity}>
      {message}
    </Alert>
  )
}

export default ToastListItem
