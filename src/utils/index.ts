import dayjs from 'dayjs'
import { v1 as uuidv1 } from 'uuid'

import { AccessLevels, Apps } from '@/constants'
import type { User } from '@/types'

export const isValidApp = (app: unknown): boolean => {
  if (typeof app !== 'string') {
    return false
  }

  return (Object.values(Apps) as string[]).includes(app)
}

export const isValidAppAbbreviationPathname = (pathname: string): boolean => {
  const regExp = new RegExp(
    `^(/api)?/app/(${Object.values(Apps).reduce(
      (accu, appAbbreviation) =>
        accu === '' ? appAbbreviation : `${accu}|${appAbbreviation}`,
      ''
    )})/.+`
  )

  return regExp.test(pathname)
}

export const hasAccessAdminPage = (user: User | null): boolean =>
  (Object.values(Apps) as string[]).find((app) => {
    const userAppAccessLevel: AccessLevels | undefined = (user?.accessLevel ??
      {})[app as Apps]

    return (
      userAppAccessLevel === AccessLevels.SUPER_ADMIN ||
      userAppAccessLevel === AccessLevels.ADMIN
    )
  }) !== undefined

export const convertTime = {
  dbToJs(date: string): string {
    return dayjs(date).format('MM/DD/YYYY h:mm a')
  }
}

export const generateUuid = (): string => {
  return uuidv1()
}

export const getCreatedAtTxt = (
  t: (text: string) => string,
  dbTime: string
): string => `${t('CREATED_AT')}: ${convertTime.dbToJs(dbTime)}`

export const getUpdatedAtTxt = (
  t: (text: string) => string,
  dbTime: string
): string => `${t('UPDATED_AT')}: ${convertTime.dbToJs(dbTime)}`

export const isServer = () => typeof window !== 'undefined'
