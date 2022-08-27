import axios from 'axios'

import { FileInputExtensions } from '@/constants/app'
import fileHttpService from '@/http-services/file'
import { generateUuid } from '@/utils/app'

const getFileType = (type: string): string | null => {
  switch (type) {
    case FileInputExtensions.PNG:
    case FileInputExtensions.JPEG:
    case FileInputExtensions.HEIC: {
      return 'image'
    }

    // TODO: Add more file types
    // case FileInputExtensions.MOV:
    case FileInputExtensions.MP4: {
      return 'video'
    }

    default: {
      return null
    }
  }
}

const getFileExtension = (type: string): string | null => {
  switch (type) {
    case FileInputExtensions.PNG: {
      return 'png'
    }

    case FileInputExtensions.JPEG: {
      return 'jpeg'
    }

    case FileInputExtensions.HEIC: {
      return 'heic'
    }

    case FileInputExtensions.MP4: {
      return 'mp4'
    }

    // TODO: Add more file types
    // case FileInputExtensions.MOV: {
    //   return 'mov'
    // }

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

export const uploadFile = (file: File, path = '') =>
  new Promise<{ key: string; type: string; extension: string }>(
    (resolve, reject) => {
      try {
        const type = getFileType(file.type)
        const extension = getFileExtension(file.type)

        if (type === null || extension === null) {
          throw new Error()
        }

        const key = `${path}${generateUuid()}`

        tryToUploadFile(key, file).then((status) => {
          if (!status) {
            throw new Error()
          }

          resolve({ key, type, extension })
        })
      } catch (_) {
        reject()
      }
    }
  )

export const deleteFilesObject = (keys: string[]) =>
  fileHttpService.deleteObjects({ keys })

const isInputFileType = (type: string, blob: Blob) =>
  new RegExp(`^${type}`).test(blob.type)

export const isImageFileType = (blob: Blob) => isInputFileType('image', blob)

export const isVideoFileType = (blob: Blob) => isInputFileType('video', blob)

export const urlToBlob = (url: string): Promise<Blob> =>
  axios.get(url, { responseType: 'blob' }).then((response) => response.data)

// TODO: One day, this will be removed when most of the browsers support displaying heic files
export const heicToPng = (blob: Blob): Promise<Blob> =>
  import('heic2any')
    .then((heic2any) => heic2any.default)
    .then(
      (heic2any) =>
        heic2any({
          blob,
          toType: FileInputExtensions.PNG,
          quality: 1
        }) as unknown as Promise<Blob>
    )
