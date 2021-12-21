import { Apps } from '@/global-types'

export const isValidAppType = (appType: unknown) => {
  if (typeof appType !== 'string') {
    return false
  }
  return (Object.values(Apps) as string[]).includes(appType)
}
