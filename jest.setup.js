import '@testing-library/jest-dom/extend-expect'

jest.mock('@/redux-actions', () => {
  const originalModule = jest.requireActual('@/redux-actions')

  return {
    __esModule: true,
    ...originalModule,
    togglePaletteMode: jest.fn(() => ({ type: '' }))
  }
})
