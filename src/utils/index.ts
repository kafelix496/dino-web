import dayjs from 'dayjs'

import { Apps } from '@/global-types'

export const isValidAppType = (appType: unknown) => {
  if (typeof appType !== 'string') {
    return false
  }
  return (Object.values(Apps) as string[]).includes(appType)
}

export const convertTime = {
  dbToJs(date: string) {
    return dayjs(date).format('MM/DD/YYYY h:mm a')
  }
}
