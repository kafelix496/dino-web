import type { FC } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import useRowsAndCols from './useRowsAndCols'

const UserList: FC = () => {
  const { isLoading, rows, columns } = useRowsAndCols()

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

export default UserList
