const request = require('supertest')
const app = require('../config/app')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../infra/helper/mong-helper')
let userModel

describe('Login Router', () => {
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

  test('Should return 200 when valid credential are provided', async () => {
    await userModel.insertOne({
      email: 'fmaycon@gmail.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })

    await request(app)
      .post('/api/login')
      .send({
        email: 'fmaycon@gmail.com',
        password: 'hashed_password'
      })
      .expect(200)
  })

  test('Should return 401 when invalid credential are provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@gmail.com',
        password: 'hashed_password'
      })
      .expect(401)
  })
})
