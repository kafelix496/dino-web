import { isImageFileType, isVideoFileType } from '@/utils/file'

describe('#file', () => {
  describe('#isImageFileType', () => {
    it('should check input file is image', () => {
      expect(isImageFileType({ type: 'image/png' } as unknown as Blob)).toBe(
        true
      )
      expect(isImageFileType({ type: 'image/jpeg' } as unknown as Blob)).toBe(
        true
      )
      expect(isImageFileType({ type: 'video/mp4' } as unknown as Blob)).toBe(
        false
      )
    })
  })

  describe('#isVideoFileType', () => {
    it('should check input file is video', () => {
      expect(isVideoFileType({ type: 'image/png' } as unknown as Blob)).toBe(
        false
      )
      expect(isVideoFileType({ type: 'image/jpeg' } as unknown as Blob)).toBe(
        false
      )
      expect(isVideoFileType({ type: 'video/mp4' } as unknown as Blob)).toBe(
        true
      )
    })
  })
})
