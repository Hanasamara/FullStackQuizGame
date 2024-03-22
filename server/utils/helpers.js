/**
 * get URL according to .env
 */
const getURL = () => {
    switch (process.env.NODE_ENV) {
      case 'basic':
        return process.env.BASIC_URL
      case 'test':
        return process.env.TEST_URL
      default:
        break
    }
  }
  
  module.exports = { getURL }