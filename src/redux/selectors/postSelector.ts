import type { RootState } from '@/redux-types'

export const selectPostUploadProgress = (state: RootState) => {
  const uploadsStatus = state.post.uploadsStatus
  const totalProgress = uploadsStatus.reduce(
    (accu, { progress }) => accu + progress,
    0
  )

  return (
    (totalProgress / uploadsStatus.length) *
    ((100 - (Math.floor(Math.random() * 5) + 1)) / 100) *
    100
  )
}
