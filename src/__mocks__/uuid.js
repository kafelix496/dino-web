jest.mock('uuid', () => {
  let index = 0

  return {
    __esModule: true,
    v1: jest.fn(() => `uuid-${index++}`)
  }
})
