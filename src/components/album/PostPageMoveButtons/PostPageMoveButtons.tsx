import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export interface PostPageMoveButtonsProps {
  isLoading: boolean
  currentPage: number
  totalPage: number
  goPrevPage: () => void
  goNextPage: () => void
}

export const PostPageMoveButtons: FC<PostPageMoveButtonsProps> = ({
  isLoading,
  currentPage,
  totalPage,
  goPrevPage,
  goNextPage
}) => {
  const { t } = useTranslation()

  if (currentPage < 1 || currentPage > totalPage) {
    return null
  }

  return (
    <Box className="__d-w-full __d-flex __d-justify-between">
      <Button
        type="button"
        variant="outlined"
        disabled={isLoading || currentPage === 1}
        onClick={() => {
          goPrevPage()
        }}
      >
        {t('BUTTON_PREV')}
      </Button>
      <Button
        type="button"
        variant="outlined"
        disabled={isLoading || currentPage === totalPage || totalPage <= 1}
        onClick={() => {
          goNextPage()
        }}
      >
        {t('BUTTON_NEXT')}
      </Button>
    </Box>
  )
}
