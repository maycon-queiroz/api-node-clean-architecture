const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUserCase) {
    this.authUserCase = authUserCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }

      const accessToken = await this.authUserCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.success({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
