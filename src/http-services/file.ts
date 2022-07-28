import { PresignedPost } from 'aws-sdk/clients/s3'
import axios from 'axios'

import type { AxiosRequestConfig } from '@/types'

interface SingedUrlResponse {
  url: string
}

interface PreSingedUrlResponse {
  url: string
  fields: PresignedPost.Fields
}

interface DeleteObjectsResponse {
  keys: string[]
}

const fileHttpService = {
  getSignedUrl: (
    data: { key: string },
    config?: AxiosRequestConfig
  ): Promise<SingedUrlResponse> =>
    axios
      .get<SingedUrlResponse>(
        `${process.env.PAGE_URL ?? ''}/api/s3/pre-signed-download?key=${
          data.key
        }`,
        config
      )
      .then((res) => res.data),
  createPresignedUrl: (
    data: { key: string },
    config?: AxiosRequestConfig
  ): Promise<PreSingedUrlResponse> =>
    axios
      .get<PreSingedUrlResponse>(
        `${process.env.PAGE_URL ?? ''}/api/s3/pre-signed-upload?key=${
          data.key
        }`,
        config
      )
      .then((res) => res.data),
  deleteObjects: (
    data: { keys: string[] },
    config?: AxiosRequestConfig
  ): Promise<DeleteObjectsResponse> =>
    axios
      .post<DeleteObjectsResponse>(
        `${process.env.PAGE_URL ?? ''}/api/s3/delete-s3-objects`,
        data.keys,
        config
      )
      .then((res) => res.data)
}

export default fileHttpService
