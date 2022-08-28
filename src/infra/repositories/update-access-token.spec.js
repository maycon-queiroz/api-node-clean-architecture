const MongoHelper = require('../helper/mong-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const { UpdateAccessTokenRepository } = require('./UpdateAccessTokenRepository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('updateAccessTokenRepository', () => {
  let fakeUserId

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      name: 'any_mane',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })

    fakeUserId = fakeUser.insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    await sut.update(fakeUserId, 'valid_token')

    const updatedFakerUser = await userModel.findOne(
      { _id: fakeUserId },
      { projection: { accessToken: 1 } }
    )
    expect(updatedFakerUser.accessToken).toBe('valid_token')
  })

  test('Should Throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    let error
    try {
      await sut.update(fakeUserId, 'valid_token')
    } catch (e) {
      error = e
    }
    expect(error).toEqual(new MissingParamError('userModel'))
  })

  test('Should Throw if no params are provided', async () => {
    const { sut } = makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update(fakeUserId)).rejects.toThrow(
      new MissingParamError('accessToken')
    )
  })
})
