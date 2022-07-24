import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Apps } from '@/constants/app'

const AdminDrawer = dynamic(
  () => import('./SidebarNavDrawer/AdminDrawer/AdminDrawer')
)
const FamilyAlbumDrawer = dynamic(
  () => import('./SidebarNavDrawer/FamilyAlbumDrawer/FamilyAlbumDrawer')
)
const MoneyTrackerDrawer = dynamic(
  () => import('./SidebarNavDrawer/MoneyTrackerDrawer/MoneyTrackerDrawer')
)

const useDrawerContent = () => {
  const router = useRouter()
  const pathname = router.asPath

  if (
    Object.values(Apps).some((appAbbreviation) =>
      new RegExp(`^/app/${appAbbreviation}/admin/user/list$`).test(pathname)
    )
  ) {
    return AdminDrawer
  }

  if (new RegExp(`^/app/${Apps.familyAlbum}/`).test(pathname)) {
    return FamilyAlbumDrawer
  }

  if (new RegExp(`^/app/${Apps.moneyTracker}/`).test(pathname)) {
    return MoneyTrackerDrawer
  }

  return null
}

export default useDrawerContent
