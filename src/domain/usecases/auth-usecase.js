const { MissingParamError, InvalidParamError } = require('../../utils/errors/index')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypt) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypt
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }

    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }

    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository')
    }

    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      return null
    }

    await this.encrypter.compare(password, user.password)
    return null
  }
}
