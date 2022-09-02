import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useCurrentUser } from './useHttpApp'

export const useRedirect404IfNotSignedIn = () => {
  const { isLoading, user } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/404')
    }
  }, [isLoading, user, router])
}
