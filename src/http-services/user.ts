import axios from 'axios'

import type { AxiosRequestConfig, User } from '@/types'

const userHttpService = {
  getCurrentUser: (config?: AxiosRequestConfig): Promise<User | null> =>
    axios
      .get<User>(`${process.env.PAGE_URL ?? ''}/api/auth/me`, config)
      .then((res) => res.data || null)
}

export default userHttpService
