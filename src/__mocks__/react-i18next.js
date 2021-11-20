jest.mock('react-i18next', () => {
  const originalModule = jest.requireActual('react-i18next')

  return {
    __esModule: true,
    ...originalModule,
    useTranslation: jest.fn(() => ({ t: (key) => key }))
  }
})
