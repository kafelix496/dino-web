import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

import { isValidAppAbbreviationPathname } from '@/utils'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  if (!token || !token.sub) {
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
    return new Response(JSON.stringify({ message: 'SEM_QUERY_NOT_ALLOWED' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}
