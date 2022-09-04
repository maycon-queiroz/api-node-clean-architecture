const { adapter } = require('../adapters/express-router-adapter')
const LoginRouterComposer = require('../composers/login-router-composer')

module.exports = router => {
  router.post('/login', adapter(LoginRouterComposer.compose()))
}
