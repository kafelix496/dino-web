import aws from 'aws-sdk'
import axios from 'axios'

import { generateUuid } from '@/utils'

interface Config {
  bucket: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

const isProd = process.env.NODE_ENV === 'production'

// Back-end
export const getDownloadUrl = async (key: string, config: Config) => {
  const s3 = new aws.S3({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4',
    ...(!isProd ? { endpoint: 'http://localhost:4566' } : {})
  })

  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: config.bucket,
    Key: key,
    Expires: 60
  })

  return url
}

// Back-end
export const getUploadUrl = (
  key: string,
  config: Config & { fileSize?: number }
) => {
  const s3 = new aws.S3({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4',
    ...(!isProd ? { endpoint: 'http://localhost:4566' } : {})
  })

  const post = s3.createPresignedPost({
    Bucket: config.bucket,
    Fields: { key },
    Expires: 60,
    Conditions: [
      ['starts-with', '$Content-Type', ''],
      ['content-length-range', 0, config?.fileSize ?? 10000000] // up to 10 MB
    ]
  })

  return post
}

const getFileExtension = (type: string): string | null => {
  switch (type) {
    case 'image/png': {
      return 'png'
    }

    case 'image/jpeg': {
      return 'jpeg'
    }

    case 'video/mp4': {
      return 'mp4'
    }

    case 'video/quicktime': {
      return 'mov'
    }

    default: {
      return null
    }
  }
}

const tryToUploadFile = async (key: string, file: File) => {
  try {
    const { url, fields } = await axios
      .get(`/api/s3/pre-signed-upload?key=${key}`)
      .then((response) => response.data)

    const formData = new FormData()
    formData.append('Content-Type', file.type)
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string | Blob)
    })

    await axios.post(url, formData)

    return true
  } catch (_) {
    return false
  }
}

// Front-end
export const getFileUrl = (key: string) =>
  new Promise<{ url: string }>((resolve, reject) => {
    return axios
      .get(`/api/s3/pre-signed-download?key=${key}`)
      .then((response) => response.data)
      .then(resolve)
      .catch(reject)
  })

// Front-end
export const uploadFile = (file: File) =>
  new Promise<{ key: string; extension: string }>((resolve, reject) => {
    try {
      const extension = getFileExtension(file.type)

      if (extension === null) {
        reject('Unexpected file type')

        return
      }

      const key = generateUuid()

      tryToUploadFile(key, file).then((status) => {
        if (status) {
          resolve({ key, extension })
        } else {
          reject('Fail to upload file')
        }
      })
    } catch (_) {
      reject('Fail to upload file')
    }
  })
