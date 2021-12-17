jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))

jest.mock('next/link', () => {
  // eslint-disable-next-line
  const React = require('react')

  return ({ children, href }) =>
    React.cloneElement(React.Children.only(children), { 'data-testhref': href })
})
