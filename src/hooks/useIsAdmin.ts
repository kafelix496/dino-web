import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { AccessLevels, Apps } from '@/constants/app'
import { selectUser } from '@/redux-selectors'
import { isValidApp } from '@/utils'

export const useIsAdmin = () => {
  const user = useSelector(selectUser)
  const router = useRouter()
  const targetApp = router.query.appAbbreviation as Apps

  if (user === null) {
    return false
  }

  if (!isValidApp(targetApp)) {
    return false
  }

  return (
    user.accessLevel[targetApp] === AccessLevels.SUPER_ADMIN ||
    user.accessLevel[targetApp] === AccessLevels.ADMIN
  )
}
