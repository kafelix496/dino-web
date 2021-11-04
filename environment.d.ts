declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string
      DATABASE_URL: string
      NEXTAUTH_URL: string
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      JWT_SECRET: string
    }
  }
}

declare module 'ramda' {
  export function compose(...rest: any[]): any
  export function flip(...rest: any[]): any
  export function transduce(...rest: any[]): any
}

export {}
