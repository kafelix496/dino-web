import type { FC, FormEvent } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface DinoDialogProps {
  open: boolean
  onClose: () => void
  title: string
  wrapBodyWithForm?: boolean
  handleFormSubmit?: (event?: FormEvent<HTMLFormElement> | undefined) => void
  contentJsx?: JSX.Element
  actionsJsx?: JSX.Element
}

const DinoDialog: FC<DinoDialogProps> = ({
  open,
  onClose,
  title,
  wrapBodyWithForm,
  handleFormSubmit,
  contentJsx,
  actionsJsx
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {wrapBodyWithForm && handleFormSubmit ? (
        <form data-testid="form" onSubmit={handleFormSubmit}>
          {contentJsx ? <DialogContent>{contentJsx}</DialogContent> : ''}
          {actionsJsx ? <DialogActions>{actionsJsx}</DialogActions> : ''}
        </form>
      ) : (
        <>
          {contentJsx ? <DialogContent>{contentJsx}</DialogContent> : ''}
          {actionsJsx ? <DialogActions>{actionsJsx}</DialogActions> : ''}
        </>
      )}
    </Dialog>
  )
}

export default DinoDialog
