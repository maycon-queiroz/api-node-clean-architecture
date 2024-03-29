jest.mock('validator', () => ({
  isEmailValid: true,
  email: '',

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}))

const validator = require('validator')
const MissingParamError = require('../errors/missing-param-error')
const EmailValidator = require('./email-validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if Validator returns is true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@gmail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should return false if Validator returns is false', () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_email@gmail')

    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('valid_email@gmail.com')

    expect(validator.email).toBe('valid_email@gmail.com')
  })

  test('Should throw if no email is provided', () => {
    const sut = makeSut()
    expect(() => {
      sut.isValid()
    }).toThrow(new MissingParamError('email'))
  })
})
