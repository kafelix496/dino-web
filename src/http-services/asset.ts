import axios from 'axios'

import type { AxiosRequestConfig } from '@/types'

interface SingedUrlResponse {
  url: string
}

const assetHttpService = {
  getSignedUrl: (
    data: { key: string; width: number; format?: string },
    config?: AxiosRequestConfig
  ): Promise<SingedUrlResponse> =>
    axios
      .get<SingedUrlResponse>(
        `${
          process.env.PAGE_URL ?? ''
        }/api/asset/signed-url?key=${encodeURIComponent(data.key)}&width=${
          data.width
        }&format=${data.format ?? ''}`,
        config
      )
      .then((res) => res.data)
}

export default assetHttpService
