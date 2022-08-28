const MongoHelper = require('../helper/mong-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { accessToken } })
  }
}

describe('updateAccessTokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      name: 'any_mane',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')

    const updatedFakerUser = await userModel.findOne(
      { _id: fakeUser.insertedId },
      { projection: { accessToken: 1 } })
    expect(updatedFakerUser.accessToken).toBe('valid_token')
  })
})
