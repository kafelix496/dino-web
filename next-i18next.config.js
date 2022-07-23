const path = require('path')

module.exports = {
  i18n: {
    locales: ['default', 'en', 'kr'],
    defaultLocale: 'default',
    localeDetection: false,
    ...(typeof window === 'undefined'
      ? { localePath: path.resolve('./public/locales') }
      : {})
  }
}
