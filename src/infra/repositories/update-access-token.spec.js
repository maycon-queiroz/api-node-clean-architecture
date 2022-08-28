const MongoHelper = require('../helper/mong-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }
    await this.userModel.updateOne({ _id: userId }, { $set: { accessToken } })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
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
    const { userModel, sut } = makeSut()
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
      { projection: { accessToken: 1 } }
    )
    expect(updatedFakerUser.accessToken).toBe('valid_token')
  })

  test('Should Throw if no userModel is provided', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      name: 'any_mane',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    let error
    try {
      await sut.update(fakeUser.insertedId, 'valid_token')
    } catch (e) {
      error = e
    }
    expect(error).toEqual(new MissingParamError('userModel'))
  })
})
