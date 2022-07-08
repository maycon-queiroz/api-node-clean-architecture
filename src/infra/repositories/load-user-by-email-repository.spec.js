class LoadUserByEmailRepository {
  load (email) {
    return null
  }
}

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@gmail.com')

    expect(user).toBeNull()
  })
})
