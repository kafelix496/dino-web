// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractReturnTypes<T extends ((...args: any[]) => any)[]> = [
  ...{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
  }
]

export type ExtractPromiseResolveReturnTypes<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ((...args: any[]) => any)[]
> = [
  ...{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: any[]) => infer R
      ? R extends Promise<infer R2>
        ? R2
        : R
      : never
  }
]
