import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Apps } from '@/constants'

const AdminDrawer = dynamic(
  () => import('./SidebarNavDrawer/AdminDrawer/AdminDrawer')
)

const MoneyTrackerDrawer = dynamic(
  () => import('./SidebarNavDrawer/MoneyTrackerDrawer/MoneyTrackerDrawer')
)

const useDrawerContent = () => {
  const router = useRouter()
  const pathname = router.asPath

  if (
    Object.values(Apps).some((app) =>
      new RegExp(`^/app/${app}/admin/user/list$`).test(pathname)
    )
  ) {
    return AdminDrawer
  }

  if (new RegExp(`^/${Apps.moneyTracker}/`).test(pathname)) {
    return MoneyTrackerDrawer
  }

  return null
}

export default useDrawerContent
