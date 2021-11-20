jest.mock('next-auth/client', () => {
  const originalModule = jest.requireActual('next-auth/client')

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => [
      {
        user: {
          name: 'testName',
          email: 'testEmail',
          image: 'https://google.com'
        },
        expires: '2100-01-01T02:54:07.085Z'
      }
    ]),
    signIn: jest.fn(),
    signOut: jest.fn()
  }
})
