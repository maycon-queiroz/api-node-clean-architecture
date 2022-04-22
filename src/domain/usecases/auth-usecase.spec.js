const { MissingParamError } = require('../../utils/errors/index')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }
    return 'accessToken'
  }
}
describe('Auth UseCase', () => {
  test('Should Throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should Throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@gmail.com')

    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
