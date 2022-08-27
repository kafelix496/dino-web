import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Locales, PaletteModes } from '@/constants/app'
import { Cookies } from '@/constants/cookies'
import {
  setLocale,
  setPaletteMode,
  setSidebarNavOpenStatus
} from '@/redux-actions'

export const useInitializeApp = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
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

    setIsInitialized(true)
  }, [dispatch])

  return { isInitialized }
}
