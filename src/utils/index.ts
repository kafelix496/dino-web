import dayjs from 'dayjs'
import type { Session } from 'next-auth'
import { v1 as uuidv1 } from 'uuid'

import { Apps } from '@/constants'

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

export const hasAccessAdminPage = (session: Session | null): boolean =>
  (Object.values(Apps) as string[]).find(
    (app) =>
      ((session?.user ?? {})[`${app as Apps}AccessLevel`] as
        | string
        | undefined) !== undefined
  ) !== undefined

export const convertTime = {
  dbToJs(date: string): string {
    return dayjs(date).format('MM/DD/YYYY h:mm a')
  }
}

export const generateUuid = (): string => {
  return uuidv1()
}

export const isServer = () => typeof window !== 'undefined'
