import useSWR from 'swr'

import appHttpService from '@/http-services/app'
import type { User } from '@/types'

export const useCurrentUser = () => {
  const { data, error, isValidating } = useSWR<User>(
    appHttpService.getCurrentUserUrl()
  )

  return {
    isLoading: data === undefined && error !== undefined,
    isValidating,
    isError: !!error,
    user: data ?? null
  }
}
