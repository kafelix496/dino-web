import { useEffect, useState } from 'react'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'

import type { AssetDefault } from '@/types/album'
import { getFileUrl, heicToPng, urlToBlob } from '@/utils/file'

interface PostListItemImageListProps {
  assets: AssetDefault[]
}

const GAP = 16
const ROW_HEIGHT = 250

const PostListItemImageList: FC<PostListItemImageListProps> = ({ assets }) => {
  const [assetsWithSrc, setAssetsWithSrc] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map(
        (asset) =>
          new Promise((resolve) => {
            getFileUrl(asset.key)
              .then(({ url }) => {
                if (asset.extension === 'heic') {
                  return urlToBlob(url)
                    .then((blob) => heicToPng(blob))
                    .then((blob) => URL.createObjectURL(blob as Blob))
                }

                return url
              })
              .then((url) => {
                resolve({ ...asset, src: url as string })
              })
          })
      )
    ).then((_assetsWithSrc) => setAssetsWithSrc(_assetsWithSrc))
  }, [assets])

  switch (assetsWithSrc.length) {
    case 1: {
      return (
        <Box
          className="__d-relative"
          sx={{ textAlign: 'center', maxHeight: ROW_HEIGHT * 2 }}
        >
          {!assetsWithSrc[0].src && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100%'}
              height={ROW_HEIGHT * 2}
            />
          )}

          {assetsWithSrc[0].src && (
            <img
              src={assetsWithSrc[0].src}
              style={{ maxWidth: '100%', maxHeight: ROW_HEIGHT * 2 }}
            />
          )}
        </Box>
      )
    }

    case 2: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={1}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset) => (
              <ImageListItem key={asset._id}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={'100%'}
                    height={ROW_HEIGHT}
                  />
                )}

                {asset.src && <img src={asset.src} />}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }

    case 3: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={2}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset, index) => (
              <ImageListItem key={asset._id} cols={index === 0 ? 2 : 1}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={'100%'}
                    height={ROW_HEIGHT}
                  />
                )}

                {asset.src && <img src={asset.src} />}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }

    default: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={2}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.slice(0, 4).map((asset, index) => (
              <ImageListItem key={asset._id}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={'100%'}
                    height={ROW_HEIGHT}
                  />
                )}

                {asset.src && index < 3 && <img src={asset.src} />}

                {asset.src && index === 3 && assetsWithSrc.length === 4 && (
                  <img src={asset.src} />
                )}

                {asset.src && index === 3 && assetsWithSrc.length > 4 && (
                  <Box sx={{ height: ROW_HEIGHT }}>
                    <img
                      src={asset.src}
                      className="__d-w-full __d-h-full __d-object-cover __d-opacity-75"
                    />
                    <AddIcon
                      className="__d-absolute"
                      fontSize="large"
                      sx={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }
  }
}

export default PostListItemImageList
