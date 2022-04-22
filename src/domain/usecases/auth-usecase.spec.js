const { MissingParamError } = require('../../utils/errors/index')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
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
})
