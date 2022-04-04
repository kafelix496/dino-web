import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import ErrorMessageBlock from '@/components/ErrorMessageBlock/ErrorMessageBlock'

import useRowsAndCols from './useRowsAndCols'

const UsersDataGrid: FC = () => {
  const { t } = useTranslation('common')
  const { loading, error, rows, columns } = useRowsAndCols()

  if (error) {
    const responseMessage = error?.response?.data?.message

    return (
      <ErrorMessageBlock
        message={
          responseMessage
            ? t(responseMessage)
            : error?.message ?? t('SEM_UNEXPECTED_ERROR')
        }
      />
    )
  }

  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableSelectionOnClick
      sx={{
        '& .MuiDataGrid-menuIconButton': {
          display: 'none'
        }
      }}
    />
  )
}

export default UsersDataGrid
