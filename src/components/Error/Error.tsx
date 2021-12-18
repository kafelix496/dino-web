import type { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import type { Theme } from '@mui/material'

interface DinoErrorProps {
  statusCode: 404 | 500
}

const DinoError: FC<DinoErrorProps> = ({ statusCode }) => {
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: (theme: Theme) => `calc(100vh - ${theme.spacing(8)})`,
        overflow: 'hidden'
      }}
    >
      <Paper elevation={4} sx={{ py: 4, px: 3 }}>
        <Typography variant="h6">{t(`ERROR_${statusCode}_MESSAGE`)}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

export default DinoError