const { MissingParamError, InvalidParamError } = require('../../utils/errors/index')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class EncryptSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }
  const encryptSpy = new EncryptSpy()

  class LoadUserByEmailRepositorySpy {
    constructor () {
      this.user = {}
    }

    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashed_Password'
  }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encryptSpy)
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encryptSpy
  }
}

describe('Auth UseCase', () => {
  test('Should Throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should Throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@gmail.com')

    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email is provided ', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@gmail.com', 'any_password')

    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@gmail.com')
  })

  test('Should throw if no loadUserByEmailRepository is provided ', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@gmail.com', 'any_password')

    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if loadUserByEmailRepository has not load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@gmail.com', 'any_password')

    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })

  test('Should return null if an invalid email is provided ', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@gmail.com', 'any_password')

    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided ', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = {}
    const accessToken = await sut.auth('invalid_email@gmail.com', 'any_password')

    expect(accessToken).toBeNull()
  })

  test('Should call Encrypt with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encryptSpy } = makeSut()
    loadUserByEmailRepositorySpy.user = {}
    await sut.auth('valid_email@gmail.com', 'any_password')

    expect(encryptSpy.password).toBe('any_password')
    expect(encryptSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
