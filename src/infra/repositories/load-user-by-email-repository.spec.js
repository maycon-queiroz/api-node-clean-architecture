const MongoHelper = require('../helper/mong-helper')
const LoadUserByEmailRepository = require('./LoadUserByEmailRepository')
const MissingParamError = require('../../utils/errors/missing-param-error')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}

describe('LoadUserByEmail Repository', () => {
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

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@gmail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
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

  test('Should return throw if no userModel is provider', async () => {
    const sut = new LoadUserByEmailRepository()
    let error

    try {
      await sut.load('any_email@gmail.com')
    } catch (e) {
      error = e
    }
    expect(error).toEqual(new MissingParamError('userModel'))
  })

  test('Should return throw if no email is provider', async () => {
    const { sut } = makeSut()
    let error

    try {
      await sut.load()
    } catch (e) {
      error = e
    }
    expect(error).toEqual(new MissingParamError('email'))
  })
})