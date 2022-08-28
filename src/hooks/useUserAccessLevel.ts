import { useRouter } from 'next/router'

import { AccessLevels, Apps } from '@/constants/app'
import { useCurrentUser } from '@/hooks/useHttpApp'

export const useUserAccessLevel = (): { userAccessLevel: AccessLevels } => {
  const { user } = useCurrentUser()
  const router = useRouter()
  const appAbbreviation = router.query.appAbbreviation as Apps

  return {
    userAccessLevel:
      user?.accessLevel[appAbbreviation as Apps] ?? AccessLevels.NONE
  }
}
