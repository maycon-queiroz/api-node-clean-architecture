const { MissingParamError } = require('../../utils/errors/index')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    if (user && await this.encrypter.compare(password, user.password)) {
      return await this.tokenGenerator.generator(user.id)
    }

    return null
  }
}
