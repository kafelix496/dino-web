const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  excludeFile: (str) => /\*.{test}.(js|jsx|ts|tsx)/.test(str),
  async redirects() {
    return [
      {
        permanent: false,
        source: '/project',
        destination: '/project/dashboard'
      }
    ]
  }
}
