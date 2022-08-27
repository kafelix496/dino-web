import { isPositiveStringNumber } from '@/utils/app'

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
