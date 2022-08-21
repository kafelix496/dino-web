import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Locales, PaletteModes } from '@/constants/app'
import { Cookies } from '@/constants/cookies'
import userHttpService from '@/http-services/user'
import { setLocale, setPaletteMode, setUser } from '@/redux-actions'

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

    userHttpService.getCurrentUser().then((user) => {
      dispatch(setUser(user))

      setTimeout(() => {
        setIsInitialized(true)
      }, 0)
    })
  }, [dispatch])

  return { isInitialized }
}
