import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

import { isValidAppAbbreviationPathname } from '@/utils'

export async function middleware(req: NextRequest) {
  // next-auth type is wrong
  // TODO: should remove 'as any' later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = await getToken({ req } as any)
  if (!token) {
    return new Response(
      JSON.stringify({ message: 'SEM_NOT_AUTHORIZED_USER' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const url = req.nextUrl.clone()
  if (!isValidAppAbbreviationPathname(url.pathname)) {
    return new Response(JSON.stringify({ message: 'SEM_UNEXPECTED_ERROR' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}
