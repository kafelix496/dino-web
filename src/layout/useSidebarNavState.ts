import nookies from 'nookies'
import { useState } from 'react'

import { COOKIES_OPTION } from '@/constants'
import { Cookies } from '@/constants/cookies'

export type SetSidebarNavOpen = (
  param: boolean | ((state: boolean) => boolean)
) => void

const useSidebarNavState = (
  initialState: boolean
): [boolean, SetSidebarNavOpen] => {
  const [isSidebarNavOpen, setSidebarNavOpen] = useState(initialState)

  const _setSidebarNavOpen = (
    param: boolean | ((state: boolean) => boolean)
  ): void => {
    if (typeof param === 'function') {
      setSidebarNavOpen((prev) => {
        const newValue = param(prev)

        nookies.set(null, Cookies.sidebarNav, String(newValue), COOKIES_OPTION)

        return newValue
      })
    } else {
      nookies.set(null, Cookies.sidebarNav, String(param), COOKIES_OPTION)

      setSidebarNavOpen(param)
    }
  }

  return [isSidebarNavOpen, _setSidebarNavOpen]
}

export default useSidebarNavState
