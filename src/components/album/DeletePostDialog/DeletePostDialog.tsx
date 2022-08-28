import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import type { FC } from 'react'

import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { useDeletePost } from '@/hooks/useHttpAlbum'

interface DeletePostDialogProps {
  id: string
  assetKeys: string[]
  closeDialog: () => void
}

const DeletePostDialog: FC<DeletePostDialogProps> = ({
  id,
  assetKeys,
  closeDialog
}) => {
  const { t } = useTranslation('common')
  const { execute } = useDeletePost()

  const handleDelete = useCallback(() => {
    closeDialog()

    execute(id, assetKeys)
  }, [id, assetKeys, closeDialog, execute])

  return (
    <DeleteConfirmationDialog
      title={t('DELETE_POST_DIALOG_TITLE')}
      description={t('DELETE_POST_DIALOG_CONTENT')}
      handleDelete={handleDelete}
      closeDialog={closeDialog}
    />
  )
}

export default DeletePostDialog
