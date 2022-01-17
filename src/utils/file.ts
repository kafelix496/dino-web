import aws from 'aws-sdk'
import axios from 'axios'

interface Config {
  bucket: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

// Back-end
export const getDownloadUrl = async (key: string, config: Config) => {
  const s3 = new aws.S3({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4'
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
  file: string,
  config: Config & { fileSize?: number }
) => {
  const s3 = new aws.S3({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4'
  })

  const post = s3.createPresignedPost({
    Bucket: config.bucket,
    Fields: { key: file },
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, config?.fileSize ?? 5000000] // up to 5 MB
    ]
  })

  return post
}

const getFileType = (type: string): string | null => {
  switch (type) {
    case 'application/pdf': {
      return 'pdf'
    }

    case 'image/png': {
      return 'png'
    }

    case 'image/jpeg': {
      return 'jpeg'
    }

    default: {
      return null
    }
  }
}

const tryToUploadFile = async (fileName: string, file: File) => {
  try {
    const { url, fields } = await axios
      .get(`/api/file/upload-url?key=${fileName}`)
      .then((response) => response.data)

    const formData = new FormData()
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
export const uploadFile = ({ key, file }: { key: string; file: File }) =>
  new Promise((resolve, reject) => {
    try {
      const fileType = getFileType(file.type)

      if (fileType === null) {
        reject('Unexpected file type')

        return
      }

      const fileName = `${key}.${fileType}`

      tryToUploadFile(fileName, file).then((status) => {
        if (status) {
          resolve({ fileName })
        } else {
          reject('Fail to upload file')
        }
      })
    } catch (_) {
      reject('Fail to upload file')
    }
  })
