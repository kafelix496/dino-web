import type { FC, FormEvent } from 'react'

import MuiDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  wrapBodyWithForm?: boolean
  handleFormSubmit?: (event?: FormEvent<HTMLFormElement> | undefined) => void
  contentJsx?: JSX.Element
  actionsJsx?: JSX.Element
}

const Dialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  wrapBodyWithForm,
  handleFormSubmit,
  contentJsx,
  actionsJsx
}) => {
  const handleClose = (_, reason: string) => {
    if (reason === 'backdropClick') {
      return
    }

    onClose()
  }

  return (
    <MuiDialog open={open} onClose={handleClose}>
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
    </MuiDialog>
  )
}

export default Dialog
