import { createApiHandler } from '@/utils/api/createApiHandler'

const hello1 = (request) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('1' + request.method)
    }, 1000)
  })

const hello2 = (request) =>
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })

export default createApiHandler<
  { get: { test: string }[]; post: { test2: string }[] },
  [typeof hello1, typeof hello2]
>([hello1, hello2], {
  get: (request, response, middlewares) => {
    response.status(200).json([{ test: '1234' }])
  },
  post: (request, response, middlewares) => {
    response.status(200).json([{ test2: '123' }, { test2: '456' }])
  }
})
