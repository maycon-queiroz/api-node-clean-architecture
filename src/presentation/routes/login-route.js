const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')
module.exports = class LoginRouter {
  constructor (authUserCase) {
    this.authUserCase = authUserCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
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
