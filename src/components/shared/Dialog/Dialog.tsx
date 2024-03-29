import type { FC, FormEvent } from 'react'

import type { Theme } from '@mui/material'
import MuiDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import type { DialogActionsProps } from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'

const CustomizedDialogAction = styled((props: DialogActionsProps) => (
  <DialogActions
    {...props}
    sx={{
      px: (theme: Theme) => theme.spacing(3),
      py: (theme: Theme) => theme.spacing(2)
    }}
  />
))``

interface DialogProps {
  open: boolean
  onClose?: () => void
  title: string
  fullScreen?: boolean
  wrapBodyWithForm?: boolean
  handleFormSubmit?: (event?: FormEvent<HTMLFormElement> | undefined) => void
  contentJsx?: JSX.Element
  actionsJsx?: JSX.Element
}

export const Dialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  fullScreen,
  wrapBodyWithForm,
  handleFormSubmit,
  contentJsx,
  actionsJsx
}) => {
  const handleClose = (_: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      return
    }

    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen ?? false}
    >
      <DialogTitle>{title}</DialogTitle>
      {wrapBodyWithForm && handleFormSubmit ? (
        <form data-testid="form" onSubmit={handleFormSubmit} noValidate>
          {contentJsx ? <DialogContent>{contentJsx}</DialogContent> : ''}
          {actionsJsx ? (
            <CustomizedDialogAction>{actionsJsx}</CustomizedDialogAction>
          ) : (
            ''
          )}
        </form>
      ) : (
        <>
          {contentJsx ? <DialogContent>{contentJsx}</DialogContent> : ''}
          {actionsJsx ? (
            <CustomizedDialogAction>{actionsJsx}</CustomizedDialogAction>
          ) : (
            ''
          )}
        </>
      )}
    </MuiDialog>
  )
}
