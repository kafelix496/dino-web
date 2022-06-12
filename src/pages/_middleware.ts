import { NextRequest, NextResponse } from 'next/server'

import { Locales } from '@/constants'
import { Cookies } from '@/constants/cookies'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const savedLocale = Object.values(Locales).includes(
    request.cookies[Cookies.locale] as Locales
  )
    ? request.cookies[Cookies.locale]
    : 'en'
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes('/api/') &&
    request.nextUrl.locale !== savedLocale

  if (shouldHandleLocale) {
    const url = request.nextUrl.clone()

    url.locale = savedLocale

    return NextResponse.redirect(url)
  }

  return undefined
}
