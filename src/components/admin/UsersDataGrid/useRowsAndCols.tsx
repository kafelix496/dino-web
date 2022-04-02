// import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR from 'swr'

import Avatar from '@mui/material/Avatar'
import type { GridColDef } from '@mui/x-data-grid'

// import { AccessLevels } from '@/constants'

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'THUMBNAIL',
    headerAlign: 'center',
    align: 'center',
    width: 100,
    filterable: false,
    sortable: false,
    renderCell: (params) => <Avatar alt="" src={params.row.image} />
  },
  {
    field: 'name',
    headerName: 'NAME',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    filterable: false,
    sortable: false
  },
  {
    field: 'email',
    headerName: 'EMAIL',
    headerAlign: 'center',
    align: 'center',
    width: 250,
    filterable: false,
    sortable: false
  },
  {
    field: 'permission',
    headerName: 'PERMISSION',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    editable: true,
    filterable: false,
    sortable: false,
    type: 'singleSelect',
    valueOptions: [
      {
        label: 'hello',
        value: '123'
      },
      {
        label: 'hello2',
        value: '456'
      }
    ],
    preProcessEditCellProps: (params) => {
      console.log('params', params)
      return { ...params.props }
    }
  }
]

// const adminPermissionOptions = [
//   {
//     label: 'PERMISSION_LABEL_EDITOR',
//     value: AccessLevels.EDITOR
//   },
//   {
//     label: 'PERMISSION_LABEL_COMMENTOR',
//     value: AccessLevels.COMMENTOR
//   },
//   {
//     label: 'PERMISSION_LABEL_VIEWER',
//     value: AccessLevels.VIEWER
//   },
//   {
//     label: 'PERMISSION_LABEL_NONE',
//     value: AccessLevels.NONE
//   }
// ]

// const superAdminPermissionOptions = [
//   {
//     label: 'PERMISSION_LABEL_ADMIN',
//     value: AccessLevels.ADMIN
//   }
// ].concat(adminPermissionOptions)

const useRowsAndCols = () => {
  const router = useRouter()
  // const { data: session } = useSession()
  const { t } = useTranslation()

  // const selectedApp = router.query.selectedApp
  // const appAccessLevel = session?.user?.appsAccessLevel

  const refinedColumns = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        headerName: t(column.headerName as string)
      })),
    [t]
  )

  const { data: rows, error } = useSWR<
    {
      _id: string
      name: string
      email: string
      image: string
    }[]
  >(`/api/admin/user/${router?.query?.selectedApp as string}`)

  const refinedRows = useMemo(
    () => (rows ?? []).map((row) => ({ ...row, id: row._id })),
    [rows]
  )

  return { rows: refinedRows, columns: refinedColumns, loading: !rows, error }
}

export default useRowsAndCols
