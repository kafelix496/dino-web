import { useCallback, useState } from 'react'

export const useDialogStatus = () => {
  const [state, dispatch] = useState({ isOpen: false, name: '' })

  const openDialog = useCallback((name = '') => {
    dispatch((state) => ({ ...state, isOpen: true, name }))
  }, [])

  const closeDialog = useCallback(() => {
    dispatch((state) => ({ ...state, isOpen: false, name: '' }))
  }, [])

  return {
    state,
    openDialog,
    closeDialog
  }
}
