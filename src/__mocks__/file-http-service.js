jest.mock('@/http-services/file', () => {
  const originalModule = jest.requireActual('@/http-services/file')

  return {
    __esModule: true,
    ...originalModule,
    getSignedUrl: jest.fn((data) => Promise.resolve({ url: data.key }))
  }
})
