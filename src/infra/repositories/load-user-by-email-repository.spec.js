const MongoHelper = require('../helper/mong-helper')
const LoadUserByEmailRepository = require('./LoadUserByEmailRepository')
const MissingParamError = require('../../utils/errors/missing-param-error')
let userModel

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@gmail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      name: 'any_mane',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@gmail.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })

  test('Should return throw if no email is provider', async () => {
    const sut = makeSut()
    let error

    try {
      await sut.load()
    } catch (e) {
      error = e
    }
    expect(error).toEqual(new MissingParamError('email'))
  })
})
