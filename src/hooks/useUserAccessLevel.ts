import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { AccessLevels, Apps } from '@/constants/app'
import { selectUser } from '@/redux-selectors'

export const useUserAccessLevel = (): { userAccessLevel: AccessLevels } => {
  const user = useSelector(selectUser)
  const router = useRouter()
  const appAbbreviation = router.query.appAbbreviation as Apps

  return {
    userAccessLevel:
      user?.accessLevel[appAbbreviation as Apps] ?? AccessLevels.NONE
  }
}
