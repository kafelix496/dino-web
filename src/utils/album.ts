import { POST_ASSET_MAX_WIDTH } from '@/constants/album'
import { FileExtensions } from '@/constants/app'
import assetHttpService from '@/http-services/asset'
import type { AxiosRequestConfig } from '@/types'
import type { Category } from '@/types/album'

import { sortAlphabetiacally } from './app'

export const getAssetSrc = (
  data: { key: string; extension: FileExtensions; width?: number },
  config?: AxiosRequestConfig
): Promise<string> =>
  assetHttpService
    .getSignedUrl(
      {
        key: data.key,
        width: data.width ?? POST_ASSET_MAX_WIDTH,
        ...(data.extension === FileExtensions.HEIC ? { format: 'jpeg' } : {})
      },
      config
    )
    .then(({ url }) => url)

export const sortCategoriesAlphabetically = (categories: Category[]) =>
  sortAlphabetiacally((category) => category.name, categories)
