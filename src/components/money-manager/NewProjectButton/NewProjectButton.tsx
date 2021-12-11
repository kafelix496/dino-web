import { useState, useCallback } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import NewProjectFormDialog from './NewProjectFormDialog/NewProjectFormDialog'

const NewButton: FC = () => {
  const { t } = useTranslation('common')
  const [isOpen, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        {t('BUTTON_NEW')}
      </Button>

      <NewProjectFormDialog isOpen={isOpen} handleClose={handleClose} />
    </>
  )
}

export default NewButton
