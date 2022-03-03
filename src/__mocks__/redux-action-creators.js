jest.mock('@/redux-action-creators', () => {
  const originalModule = jest.requireActual('@/redux-action-creators')

  return {
    __esModule: true,
    ...originalModule,
    setPaletteMode: jest.fn(() => ({ type: '' })),
    setLocale: jest.fn(() => ({ type: '' }))
  }
})
