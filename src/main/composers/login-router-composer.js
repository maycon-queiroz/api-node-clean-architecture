const LoginRouter = require('../../presentation/routes/login-route')
const AuthUserCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/LoadUserByEmailRepository')
const UpdateAccessTokenRepository = require('../../infra/repositories/UpdateAccessTokenRepository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

module.exports = class LoginRouterComposer {
  static compose () {
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const emailValidator = new EmailValidator()
    const authUserCase = new AuthUserCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    return new LoginRouter({
      authUserCase,
      emailValidator
    })
  }
}
