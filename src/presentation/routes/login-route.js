const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')
module.exports = class LoginRouter {
  constructor (authUserCase, emailValidator) {
    this.authUserCase = authUserCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUserCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError(new UnauthorizedError())
      }

      return HttpResponse.success({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
