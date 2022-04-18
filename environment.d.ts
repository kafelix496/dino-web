declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_BUCKET_NAME: string
      AWS_BUCKET_REGION: string
      AWS_ACCESS_KEY: string
      AWS_SECRET_KEY: string
      DATABASE_URL: string
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      NEXTAUTH_SECRET: string
      PAGE_URL: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user?:
      | {
          name?: string | null | undefined
          email?: string | null | undefined
          image?: string | null | undefined
          id?: string | null | undefined
          // NOTE: 496-1
          faAccessLevel?: string | null | undefined
          mtAccessLevel?: string | null | undefined
        }
      | undefined
  }
}

declare module 'ramda' {
  export function compose(...rest: any[]): any
  export function flip(...rest: any[]): any
  export function transduce(...rest: any[]): any
}

// TODO:
// after I update to react18, it complains about this
// but I want to remove this one day
declare module 'next-i18next' {
  export function useTranslation(ns: string): { t: any }
}

export {}
