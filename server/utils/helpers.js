/**
 * get URL according to .env
 */
const getURL = () => {
    switch (process.env.NODE_ENV) {
      case 'basic':
        return process.env.BASIC_URL
      case 'user':
        return process.env.USER_URL
      default:
        break
    }
  }
  
  module.exports = { getURL }