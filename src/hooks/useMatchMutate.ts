import { useSWRConfig } from 'swr'
import * as R from 'ramda'

export default function useMatchMutate() {
  const { cache, mutate } = useSWRConfig()

  return (
    matcher: RegExp,
    data?: any,
    shouldRevalidate?: boolean | undefined
  ) => {
    if (!(cache instanceof Map)) {
      throw new Error(
        'matchMutate requires the cache provider to be a Map instance'
      )
    }

    const mutations: Promise<any>[] = R.transduce(
      R.compose(
        R.filter(R.test(matcher)),
        R.map((key: string) => mutate(key, data, shouldRevalidate))
      ),
      R.flip(R.append),
      []
    )(cache.keys())

    return Promise.all(mutations)
  }
}
