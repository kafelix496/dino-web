import { isPositiveStringNumber, sortAlphabetiacally } from './app'

describe('#isPositiveStringNumber', () => {
  it('should return false if input is "0"', () => {
    expect(isPositiveStringNumber('0')).toBe(false)
  })

  it('should return false if input includes any non-number', () => {
    expect(isPositiveStringNumber(undefined)).toBe(false)
    expect(isPositiveStringNumber(null)).toBe(false)
    expect(isPositiveStringNumber('-0')).toBe(false)
    expect(isPositiveStringNumber('-4')).toBe(false)
    expect(isPositiveStringNumber('a4')).toBe(false)
    expect(isPositiveStringNumber('4a')).toBe(false)
  })

  it('should return false if number starts 0', () => {
    expect(isPositiveStringNumber('02')).toBe(false)
    expect(isPositiveStringNumber('04')).toBe(false)
  })

  it('should return true if number is positive string number', () => {
    expect(isPositiveStringNumber('2')).toBe(true)
    expect(isPositiveStringNumber('5')).toBe(true)
    expect(isPositiveStringNumber('15')).toBe(true)
  })
})

describe('sortAlphabetiacally', () => {
  it('should sort as expected', () => {
    const items = [
      { _id: '3333', name: '3333_NAME' },
      { _id: '1111', name: '1111_NAME' },
      { _id: '2222', name: '2222_NAME' }
    ]

    expect(sortAlphabetiacally((item) => item.name, items)).toEqual([
      { _id: '1111', name: '1111_NAME' },
      { _id: '2222', name: '2222_NAME' },
      { _id: '3333', name: '3333_NAME' }
    ])
  })

  it('should sort as expected', () => {
    const items = ['3333_NAME', '1111_NAME', '2222_NAME']

    expect(sortAlphabetiacally((item) => item, items)).toEqual([
      '1111_NAME',
      '2222_NAME',
      '3333_NAME'
    ])
  })
})
