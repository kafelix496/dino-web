jest.mock('uuid', () => ({
  __esModule: true,
  v1: jest.fn()
}))
