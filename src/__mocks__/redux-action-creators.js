jest.mock('@/redux-actions', () => {
  const originalModule = jest.requireActual('@/redux-actions')

  return {
    __esModule: true,
    ...originalModule,
    setPaletteMode: jest.fn(() => ({ type: '' })),
    setLocale: jest.fn(() => ({ type: '' }))
  }
})
