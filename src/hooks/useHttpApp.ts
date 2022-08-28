import useSWR from 'swr'

import appHttpService from '@/http-services/app'
import type { User } from '@/types'

export const useCurrentUser = () => {
  const { data, error } = useSWR<User>(appHttpService.getCurrentUserUrl())

  return {
    isLoading: !data && !error,
    isError: !!error,
    user: data ?? null
  }
}
