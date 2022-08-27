jest.mock('@/hooks/useHttpApp', () => {
  const originalModule = jest.requireActual('@/hooks/useHttpApp')

  return {
    __esModule: true,
    ...originalModule,
    useCurrentUser: jest.fn(() => ({}))
  }
})
