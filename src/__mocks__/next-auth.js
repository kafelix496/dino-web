jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')

  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(),
    signOut: jest.fn()
  }
})
