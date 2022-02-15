import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Apps } from '@/constants'

const DinoAdminDrawer = dynamic(
  () => import('./SidebarNavDrawer/AdminDrawer/AdminDrawer')
)

const DinoMoneyTrackerDrawer = dynamic(
  () => import('./SidebarNavDrawer/MoneyTrackerDrawer/MoneyTrackerDrawer')
)

const useDrawerContent = () => {
  const router = useRouter()
  const pathname = router.pathname

  if (/^\/admin\/users$/.test(pathname)) {
    return DinoAdminDrawer
  }

  if (new RegExp(`^/${Apps.moneyTracker}/`).test(pathname)) {
    return DinoMoneyTrackerDrawer
  }

  return null
}

export default useDrawerContent
