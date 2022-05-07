class Encrypter {
  async compare (value, hashedValue) {
    return true
  }
}

describe('Encrypter', function () {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })
})
