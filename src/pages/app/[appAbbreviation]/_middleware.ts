import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

import { isValidAppAbbreviationPathname } from '@/utils'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const token = await getToken({ req })
  if (!token || !token.sub) {
    url.pathname = '/401'

    return NextResponse.redirect(url)
  }

  if (!isValidAppAbbreviationPathname(url.pathname)) {
    url.pathname = '/400'

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
