import aws from 'aws-sdk'

interface Config {
  bucket: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

const generateS3Instance = (config: Config) =>
  new aws.S3({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4'
  })

export const getSignedUrl = async (key: string, config: Config) => {
  const s3 = generateS3Instance(config)

  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: config.bucket,
    Key: key,
    Expires: 60
  })

  return url
}

export const createPresignedUrl = (key: string, config: Config) => {
  const s3 = generateS3Instance(config)

  const post = s3.createPresignedPost({
    Bucket: config.bucket,
    Fields: { key },
    Expires: 60,
    Conditions: [
      ['starts-with', '$Content-Type', ''],
      ['content-length-range', 0, 200000000] // up to 200 MB
    ]
  })

  return post
}

export const deleteS3Objects = (keys: string[], config: Config) => {
  const s3 = generateS3Instance(config)

  const post = s3.deleteObjects({
    Bucket: config.bucket,
    Delete: { Objects: keys.map((key) => ({ Key: key })) }
  })

  return post
}
