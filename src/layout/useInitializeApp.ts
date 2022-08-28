import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Locales, PaletteModes } from '@/constants/app'
import { Cookies } from '@/constants/cookies'
import { useCurrentUser } from '@/hooks/useHttpApp'
import {
  setLocale,
  setPaletteMode,
  setSidebarNavOpenStatus
} from '@/redux-actions'

export const useInitializeApp = () => {
  const { isLoading: isUserLoading } = useCurrentUser()
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    const savedPaletteMode = nookies.get()[Cookies.paletteMode]
    dispatch(
      setPaletteMode(
        Object.values(PaletteModes).includes(savedPaletteMode as PaletteModes)
          ? (savedPaletteMode as PaletteModes)
          : PaletteModes.LIGHT
      )
    )

    const savedLocale = nookies.get()[Cookies.locale]
    dispatch(
      setLocale(
        Object.values(Locales).includes(savedLocale as Locales)
          ? (savedLocale as Locales)
          : Locales.EN
      )
    )

    const savedSidebarNavOpenStatus =
      nookies.get()[Cookies.sidebarNav] === 'true'
    dispatch(setSidebarNavOpenStatus(!!savedSidebarNavOpenStatus))

    if (!isUserLoading) {
      timer = setTimeout(() => {
        setIsInitialized(true)
      }, 250)
    }

    return () => {
      clearTimeout(timer)
      timer = undefined
    }
  }, [dispatch, isUserLoading])

  return { isInitialized }
}
