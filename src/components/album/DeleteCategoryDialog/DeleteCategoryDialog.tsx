import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useCallback } from 'react'

import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { useDeleteCategory } from '@/hooks/useHttpAlbum'

interface DeleteCategoryDialogProps {
  id: string
  closeDialog: () => void
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({
  id,
  closeDialog
}) => {
  const { t } = useTranslation('common')
  const { execute } = useDeleteCategory()

  const handleDelete = useCallback(() => {
    closeDialog()

    execute(id)
  }, [id, closeDialog, execute])

  return (
    <DeleteConfirmationDialog
      title={t('DELETE_CATEGORY_DIALOG_TITLE')}
      description={t('DELETE_CATEGORY_DIALOG_CONTENT')}
      handleDelete={handleDelete}
      closeDialog={closeDialog}
    />
  )
}
