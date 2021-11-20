jest.mock('@/redux-action-creators', () => {
  const originalModule = jest.requireActual('@/redux-action-creators')

  return {
    __esModule: true,
    ...originalModule,
    togglePaletteMode: jest.fn(() => ({ type: '' }))
  }
})
