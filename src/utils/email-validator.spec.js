const validator = require('validator')
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
})
