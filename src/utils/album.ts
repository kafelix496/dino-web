import { POST_MAX_ASSET_WIDTH } from '@/constants/album'
import { FileExtensions } from '@/constants/app'
import assetHttpService from '@/http-services/asset'
import type { AxiosRequestConfig } from '@/types'

export const getAssetSrc = (
  data: { key: string; extension: FileExtensions },
  config?: AxiosRequestConfig
): Promise<string> =>
  assetHttpService
    .getSignedUrl(
      {
        key: data.key,
        width: POST_MAX_ASSET_WIDTH,
        ...(data.extension === FileExtensions.HEIC ? { format: 'jpeg' } : {})
      },
      config
    )
    .then(({ url }) => url)
