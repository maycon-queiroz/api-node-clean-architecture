const { ServerError } = require('../errors/index')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: { error: error.message }
    }
  }

  static unauthorizedError (error) {
    return {
      statusCode: 401,
      body: { error: error.message }
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: { error: new ServerError().message }
    }
  }

  static success (body) {
    return {
      statusCode: 200,
      body
    }
  }
}
