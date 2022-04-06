import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import type { TFunction } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import Avatar from '@mui/material/Avatar'
import type { GridColDef } from '@mui/x-data-grid'

import { AccessLevels, Apps } from '@/constants'
import type { User } from '@/types'

const getAdminPermissionOptions = (t: TFunction) => [
  {
    label: t(`PERMISSION_LABEL_${AccessLevels.EDITOR}`),
    value: AccessLevels.EDITOR
  },
  {
    label: t(`PERMISSION_LABEL_${AccessLevels.COMMENTOR}`),
    value: AccessLevels.COMMENTOR
  },
  {
    label: t(`PERMISSION_LABEL_${AccessLevels.VIEWER}`),
    value: AccessLevels.VIEWER
  },
  {
    label: t(`PERMISSION_LABEL_${AccessLevels.NONE}`),
    value: AccessLevels.NONE
  }
]

const getSuperAdminPermissionOptions = (t: TFunction) =>
  [
    {
      label: t(`PERMISSION_LABEL_${AccessLevels.ADMIN}`),
      value: AccessLevels.ADMIN
    }
  ].concat(getAdminPermissionOptions(t))

const useRowsAndCols = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { mutate } = useSWRConfig()
  const targetAppAbbreviation = router.query.appAbbreviation
  const { data: rows, error } = useSWR<User[]>(
    `/api/app/${targetAppAbbreviation as string}/admin/user`
  )

  const userAppAccessLevel = (session?.user ?? {})[
    `${targetAppAbbreviation as Apps}AccessLevel`
  ]

  const columns: GridColDef[] = useMemo(
    () => [
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
        valueOptions: [],
        valueFormatter: (params) => t(`PERMISSION_LABEL_${params.value}`),
        valueSetter: (params) => {
          mutate(
            `/api/app/${targetAppAbbreviation}/admin/user`,
            rows!.map((row) =>
              row._id === params.row._id
                ? {
                    ...row,
                    [`${targetAppAbbreviation}AccessLevel`]:
                      params.value as AccessLevels
                  }
                : row
            ),
            false
          )

          axios
            .put(
              `/api/app/${targetAppAbbreviation}/admin/user/${params.row._id}`,
              {
                permission: params.value
              }
            )
            .catch(() => {
              mutate(`/api/app/${targetAppAbbreviation}/admin/user`)

              alert(t('ERROR_ALERT_MESSAGE'))
            })

          return { ...params.row, faAccessLevel: params.value }
        }
      }
    ],
    [t, rows, targetAppAbbreviation, mutate]
  )

  const refinedColumns = useMemo(
    () =>
      columns.map((column) => {
        const translatedHeaderName = t(column.headerName as string)
        if (column.field !== 'permission') {
          return { ...column, headerName: translatedHeaderName }
        }

        // only permission field comes here
        const defaultRefinedColumn = {
          ...column,
          field: `${targetAppAbbreviation}AccessLevel`,
          headerName: translatedHeaderName
        }

        if (userAppAccessLevel === AccessLevels.SUPER_ADMIN) {
          return {
            ...defaultRefinedColumn,
            valueOptions: getSuperAdminPermissionOptions(t)
          }
        }

        if (userAppAccessLevel === AccessLevels.ADMIN) {
          return {
            ...defaultRefinedColumn,
            valueOptions: getAdminPermissionOptions(t)
          }
        }

        return {
          ...defaultRefinedColumn,
          valueOptions: []
        }
      }),
    [t, columns, targetAppAbbreviation, userAppAccessLevel]
  )

  const refinedRows = useMemo(
    () => (rows ?? []).map((row) => ({ ...row, id: row._id })),
    [rows]
  )

  return { rows: refinedRows, columns: refinedColumns, loading: !rows, error }
}

export default useRowsAndCols
