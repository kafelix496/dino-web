const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  excludeFile: (str) => /\*.{test}.(js|jsx|ts|tsx)/.test(str),
  async redirects() {
    return [
      {
        permanent: false,
        source: '/app/:appAbbreviation/admin',
        destination: '/app/:appAbbreviation/admin/users'
      },
      {
        permanent: false,
        source: '/app/:appAbbreviation/project',
        destination: '/app/:appAbbreviation/project/list'
      }
    ]
  }
}
