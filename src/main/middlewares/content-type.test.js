const request = require('supertest')
const app = require('../config/app')

describe('Content-Type Middlewares', () => {
  test('Should return json content type as default', async () => {
    app.get('/test_content_type', (request, response) => {
      response.json({})
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
