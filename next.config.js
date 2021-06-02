const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    API_URL: (() => {
      if(isDev) {
        return 'http://localhost:4000'
      }
      else if (isProd) {
        return 'http://localhost:4000'
      }
      else if(isStaging){
        return 'http://localhost:4000'
      }
      else return 'http://localhost:4000'
    })(),
  }

  return {
    env,
  }
}
