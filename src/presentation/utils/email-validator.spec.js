class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('should return true if returns is true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_emnail@gmail.com')

    expect(isEmailValid).toBe(true)
  })
})
