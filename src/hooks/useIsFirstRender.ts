import { useRef } from 'react'

export const useIsFirstRender = (): { isFirst: boolean } => {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
  }

  return { isFirst: isFirst.current }
}
