import dayjs from 'dayjs'
import { v1 as uuidv1 } from 'uuid'

import { Apps } from '@/global-types'

export const isValidAppType = (appType: unknown): boolean => {
  if (typeof appType !== 'string') {
    return false
  }

  return (Object.values(Apps) as string[]).includes(appType)
}

export const convertTime = {
  dbToJs(date: string): string {
    return dayjs(date).format('MM/DD/YYYY h:mm a')
  }
}

export const generateUuid = (): string => {
  return uuidv1()
}
