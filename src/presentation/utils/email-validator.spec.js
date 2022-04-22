const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('should return true if Validator returns is true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@gmail.com')

    expect(isEmailValid).toBe(true)
  })

  test('should return false if Validator returns is false', () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_email@gmail')

    expect(isEmailValid).toBe(false)
  })
})
