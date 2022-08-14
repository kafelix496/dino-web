import { useEffect } from 'react'
import type { DependencyList, EffectCallback } from 'react'

import { useIsFirstRender } from './useIsFirstRender'

export const useUpdateEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
