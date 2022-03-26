const LoginRouter = require('./login-route')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  const authUseCaseSplay = new AuthUseCaseSpy()
  authUseCaseSplay.accessToken = 'valid credentials'

  const sut = new LoginRouter(authUseCaseSplay)

  return {
    sut,
    authUseCaseSplay
  }
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body ', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSplay } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }

    sut.route(httpRequest)
    expect(authUseCaseSplay.email).toBe(httpRequest.body.email)
    expect(authUseCaseSplay.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credentials are provided', () => {
    const { sut, authUseCaseSplay } = makeSut()
    authUseCaseSplay.accessToken = null
    const httpRequest = {
      body: {
        email: 'invalid_any_email',
        password: 'invalid_any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 201 when valid credentials are provided', () => {
    const { sut, authUseCaseSplay } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid_any_email',
        password: 'valid_any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSplay.accessToken)
  })

  test('Should return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'invalid_any_email',
        password: 'invalid_any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if AuthUseCase has not auth method', () => {
    class AuthUseCaseSpy { }
    const authUseCaseSplay = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSplay)
    const httpRequest = {
      body: {
        email: 'invalid_any_email',
        password: 'invalid_any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
