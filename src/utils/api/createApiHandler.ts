import type { NextApiRequest, NextApiResponse } from 'next'

import type { ExtractPromiseResolveReturnTypes } from '@/types/extensions'

type MethodFn<R, M> = (
  request: NextApiRequest,
  response: NextApiResponse<R>,
  middlewares: M
) => void

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseMethods<T = any> = Partial<{ [key in HttpMethod]: T }>

type Response<
  R extends ResponseMethods<GetRes | PostRes | PutRes | DeleteRes>,
  GetRes,
  PostRes,
  PutRes,
  DeleteRes
> =
  | (GetRes extends undefined ? never : R['get'])
  | (PostRes extends undefined ? never : R['post'])
  | (PutRes extends undefined ? never : R['put'])
  | (DeleteRes extends undefined ? never : R['delete'])
  | { message: string }

type CreateApiHandler<R extends ResponseMethods, M> = {
  get?: MethodFn<R['get'], M>
  post?: MethodFn<R['post'], M>
  put?: MethodFn<R['put'], M>
  delete?: MethodFn<R['delete'], M>
}

type MiddlewareFn = (request: NextApiRequest) => unknown

type MiddlewareFnsReturnType<M> = M extends MiddlewareFn[]
  ? ExtractPromiseResolveReturnTypes<M>
  : []

export const createApiHandler = <
  R extends ResponseMethods,
  M extends MiddlewareFn[] | null
>(
  middlewares: M,
  methods: CreateApiHandler<R, MiddlewareFnsReturnType<M>>
) => {
  return async <GetRes, PostRes, PutRes, DeleteRes>(
    request: NextApiRequest,
    response: NextApiResponse<Response<R, GetRes, PostRes, PutRes, DeleteRes>>
  ) => {
    const resolvedMiddlewares = (await Promise.all(
      (middlewares ?? []).map((middleware) => middleware(request))
    )) as MiddlewareFnsReturnType<M>

    try {
      switch (request.method) {
        case 'GET': {
          if (methods.get) {
            return methods.get(request, response, resolvedMiddlewares)
          }

          return response
            .status(405)
            .json({ message: 'SEM_METHOD_NOT_ALLOWED' })
        }

        case 'POST': {
          if (methods.post) {
            return methods.post(request, response, resolvedMiddlewares)
          }

          return response
            .status(405)
            .json({ message: 'SEM_METHOD_NOT_ALLOWED' })
        }

        case 'PUT': {
          if (methods.put) {
            return methods.put(request, response, resolvedMiddlewares)
          }

          return response
            .status(405)
            .json({ message: 'SEM_METHOD_NOT_ALLOWED' })
        }

        case 'DELETE': {
          if (methods.delete) {
            return methods.delete(request, response, resolvedMiddlewares)
          }

          return response
            .status(405)
            .json({ message: 'SEM_METHOD_NOT_ALLOWED' })
        }
      }
    } catch (_) {
      return response.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
    }
  }
}
