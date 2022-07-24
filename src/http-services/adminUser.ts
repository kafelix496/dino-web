import axios from 'axios'

import { AccessLevels, Apps } from '@/constants/app'
import type { AxiosRequestConfig, User } from '@/types'

const adminUserHttpService = {
  getUsers: (
    data: { appAbbreviation: Apps },
    config?: AxiosRequestConfig
  ): Promise<User[]> =>
    axios
      .get<User[]>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          data.appAbbreviation
        }/admin/user`,
        config
      )
      .then((res) => res.data),
  editUserPermission: (
    data: {
      appAbbreviation: Apps
      userId: string
      value: AccessLevels
    },
    config?: AxiosRequestConfig
  ): Promise<User> =>
    axios
      .put<User>(
        `/api/app/${data.appAbbreviation}/admin/user/${data.userId}`,
        { permission: data.value },
        config
      )
      .then((res) => res.data)
}

export default adminUserHttpService
