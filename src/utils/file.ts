import axios from 'axios'

import fileHttpService from '@/http-services/file'
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
    const { url, fields } = await fileHttpService.createPresignedUrl({ key })

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

export const getFileUrl = (key: string) => fileHttpService.getSignedUrl({ key })

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
  fileHttpService.deleteObjects({ keys })
