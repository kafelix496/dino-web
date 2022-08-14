import ImageKit from 'imagekit'
import type { NextApiRequest, NextApiResponse } from 'next'

const imageKitEnvs = [
  {
    urlEndpoint: process.env.DINO_IMAGE_KIT_URL_ENDPOINT_1,
    accessKey: process.env.DINO_IMAGE_KIT_ACCESS_KEY_1,
    secretKey: process.env.DINO_IMAGE_KIT_SECRET_KEY_1
  },
  {
    urlEndpoint: process.env.DINO_IMAGE_KIT_URL_ENDPOINT_2,
    accessKey: process.env.DINO_IMAGE_KIT_ACCESS_KEY_2,
    secretKey: process.env.DINO_IMAGE_KIT_SECRET_KEY_2
  },
  {
    urlEndpoint: process.env.DINO_IMAGE_KIT_URL_ENDPOINT_3,
    accessKey: process.env.DINO_IMAGE_KIT_ACCESS_KEY_3,
    secretKey: process.env.DINO_IMAGE_KIT_SECRET_KEY_3
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ url: string } | { message: string }>
) {
  try {
    const { key, width, format } = req.query as unknown as {
      key: string
      width: string
      format: string
    }

    switch (req.method) {
      case 'GET': {
        const randomNumber = Math.floor(Math.random() * 3)
        const imageKit = new ImageKit({
          publicKey: imageKitEnvs[randomNumber].accessKey,
          privateKey: imageKitEnvs[randomNumber].secretKey,
          urlEndpoint: imageKitEnvs[randomNumber].urlEndpoint
        })

        const url = imageKit.url({
          path: key,
          transformation: [
            {
              width,
              ...(format ? { format } : {})
            }
          ],
          signed: true,
          expireSeconds: 300
        })

        return res.status(200).json({ url })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
