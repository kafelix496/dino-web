import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

import { isValidAppAbbreviationPathname } from '@/utils'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // next-auth type is wrong
  // TODO: should remove 'as any' later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = await getToken({ req } as any)
  if (!token) {
    url.pathname = '/401'

    return NextResponse.redirect(url)
  }

  if (!isValidAppAbbreviationPathname(url.pathname)) {
    url.pathname = '/500'

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
