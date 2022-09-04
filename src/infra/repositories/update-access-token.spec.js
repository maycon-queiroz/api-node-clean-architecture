const MongoHelper = require('../helper/mong-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdateAccessTokenRepository = require('./UpdateAccessTokenRepository')
let userModel, fakeUserId

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('updateAccessTokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
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
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')

    const updatedFakerUser = await userModel.findOne(
      { _id: fakeUserId },
      { projection: { accessToken: 1 } }
    )

    expect(updatedFakerUser.accessToken).toBe('valid_token')
  })

  test('Should Throw if no params are provided', async () => {
    const sut = makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update(fakeUserId)).rejects.toThrow(
      new MissingParamError('accessToken')
    )
  })
})
