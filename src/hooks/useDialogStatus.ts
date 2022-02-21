import { useCallback, useState } from 'react'

const useDialogStatus = () => {
  const [state, dispatch] = useState({ isOpen: false, name: '' })

  const handleOpen = (name = '') => {
    dispatch((state) => ({ ...state, isOpen: true, name }))
  }

  const handleClose = useCallback(() => {
    dispatch((state) => ({ ...state, isOpen: false, name: '' }))
  }, [])

  return {
    state,
    handleOpen,
    handleClose
  }
}

export default useDialogStatus
