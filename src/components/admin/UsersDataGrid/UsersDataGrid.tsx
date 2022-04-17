import type { FC } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import type { User } from '@/types'

import useRowsAndCols from './useRowsAndCols'

interface UsersDataGridProps {
  users: User[]
}

const UsersDataGrid: FC<UsersDataGridProps> = ({ users }) => {
  const { isLoading, rows, columns } = useRowsAndCols(users)

  return (
    <DataGrid
      loading={isLoading}
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
