const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUserCase) {
    this.authUserCase = authUserCase
  }

  route (httpRequest) {
    if (typeof httpRequest === 'undefined' || !httpRequest.body) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }

    this.authUserCase.auth(email, password)

    return {
      statusCode: 401
    }
  }
}
