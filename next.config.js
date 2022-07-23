const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching
  },
  i18n,
  reactStrictMode: false,
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
})
