
const ServerError = require('./server-error')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static unauthorizedError (error) {
    return {
      statusCode: 401,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static success (response) {
    return {
      statusCode: 200,
      body: response
    }
  }
}
