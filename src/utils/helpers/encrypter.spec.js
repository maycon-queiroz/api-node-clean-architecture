jest.mock('bcrypt', () => ({
  isValid: true,

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const MissingParamError = require('../errors/missing-param-error')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', function () {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toMatchObject(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toMatchObject(
      new MissingParamError('hash')
    )
  })
})
