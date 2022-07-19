const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: false,
  excludeFile: (str) => /\*.{test}.(js|jsx|ts|tsx)/.test(str),
  images: {
    domains: [
      // google account thumbnail
      'lh3.googleusercontent.com'
    ]
  },
  async redirects() {
    return [
      {
        permanent: false,
        source: '/app/:appAbbreviation/admin',
        destination: '/app/:appAbbreviation/admin/user/list'
      },
      {
        permanent: false,
        source: '/app/:appAbbreviation/admin/user',
        destination: '/app/:appAbbreviation/admin/user/list'
      },
      {
        permanent: false,
        source: '/app/:appAbbreviation/project',
        destination: '/app/:appAbbreviation/project/list'
      }
    ]
  }
}
