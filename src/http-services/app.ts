import axios from 'axios'

import type { AxiosRequestConfig, User } from '@/types'

const appHttpService = {
  getCurrentUserUrl() {
    return `${process.env.PAGE_URL ?? ''}/api/auth/me`
  },
  async getCurrentUser(config?: AxiosRequestConfig): Promise<User | null> {
    return axios
      .get<User>(this.getCurrentUserUrl(), config)
      .then((res) => res.data || null)
  }
}

export default appHttpService
