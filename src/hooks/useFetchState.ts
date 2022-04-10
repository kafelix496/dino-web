import axios from 'axios'
import type { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

const useFetchState = <T>(
  url: string
): {
  data: T | undefined
  setData: Dispatch<SetStateAction<T | undefined>>
  loading: boolean
  error: AxiosError | undefined
  forceReload: () => void
} => {
  const [dataState, setDataState] = useState<T>()
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [errorState, setErrorState] = useState<AxiosError>()
  const [forceLoadState, setForceLoadState] = useState<boolean>(false)

  const forceReload = useCallback(() => {
    setForceLoadState((prev) => !prev)
  }, [])

  useEffect(() => {
    setLoadingState(true)
    setErrorState(undefined)

    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setLoadingState(false)
        setDataState(data)
      })
      .catch((err) => {
        setLoadingState(false)
        setDataState(undefined)
        setErrorState(err)
      })
  }, [url, forceLoadState])

  return {
    data: dataState,
    setData: setDataState,
    loading: loadingState,
    error: errorState,
    forceReload
  }
}

export default useFetchState
