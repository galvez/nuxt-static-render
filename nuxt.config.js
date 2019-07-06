import dummyAPIService from './service'

export default {
  mode: 'universal', // default

  serverMiddleware: [
    (_, res, next) => {
      // For convenience
      res.json = (payload) => {
        res.type = 'application/json'
        res.write(JSON.stringify(payload))
        res.end()
      }
      next()
    },
    dummyAPIService
  ],

  // Load data from lean data service
  plugins: ['~/plugins/nuxt-hydrate'],

  // Used by lean data middleware
  modules: [
    ['@nuxt/http', {
      browserBaseUrl: '/'
    }]
  ]
}
