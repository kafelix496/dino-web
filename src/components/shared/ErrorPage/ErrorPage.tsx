import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface ErrorPageProps {
  statusCode: 404 | 500
}

export const ErrorPage: FC<ErrorPageProps> = ({ statusCode }) => {
  const { t } = useTranslation('common')

  return (
    <Box className="__d-flex-center __d-h-screen">
      <Paper elevation={4} sx={{ py: 4, px: 3 }}>
        <Typography variant="h6">{t(`ERROR_${statusCode}_MESSAGE`)}</Typography>
        <Box className="__d-flex __d-justify-end">
          <Link href="/">
            <Button sx={{ mt: 3 }} variant="contained">
              {t('GO_TO_HOMEPAGE')}
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  )
}
