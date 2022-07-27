import axios from 'axios'

import { generateUuid } from '@/utils'

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

export const getFileUrl = (key: string) =>
  new Promise<{ url: string }>((resolve, reject) => {
    return axios
      .get(`/api/s3/pre-signed-download?key=${key}`)
      .then((response) => response.data)
      .then(resolve)
      .catch(reject)
  })

export const uploadFile = (file: File) =>
  new Promise<{ key: string; extension: string }>((resolve, reject) => {
    try {
      const extension = getFileExtension(file.type)

      if (extension === null) {
        throw new Error()
      }

      const key = generateUuid()

      tryToUploadFile(key, file).then((status) => {
        if (!status) {
          throw new Error()
        }

        resolve({ key, extension })
      })
    } catch (_) {
      reject()
    }
  })

export const deleteFilesObject = (keys: string[]) =>
  new Promise<void>((resolve, reject) => {
    return axios
      .post('/api/s3/delete-s3-objects', { keys })
      .then(() => {
        resolve(undefined)
      })
      .catch(reject)
  })
