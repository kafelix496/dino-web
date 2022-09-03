import { mswServer } from '@/utils/msw-server'
import '@testing-library/jest-dom/extend-expect'

beforeAll(() => {
  mswServer.listen()
})

afterEach(() => {
  mswServer.resetHandlers()
})

afterAll(() => {
  mswServer.close()
})
