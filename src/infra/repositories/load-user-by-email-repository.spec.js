const { MongoClient } = require('mongodb')
let connection, db

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  load (email) {
    return this.userModel.findOne({ email })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@gmail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne({ email: 'valid_email@gmail.com' })
    const user = await sut.load('valid_email@gmail.com')
    expect(user.email).toBe('valid_email@gmail.com')
  })
})
