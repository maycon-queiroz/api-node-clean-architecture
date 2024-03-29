const request = require('supertest')

describe('Content-Type Middlewares', () => {
  let app

  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })

  test('Should return json content type as default', async () => {
    app.get('/test_content_type', (request, response) => {
      response.json({})
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type if forced', async () => {
    app.get('/test_content_type', (request, response) => {
      response.type('xml')
      response.json({})
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /xml/)
  })
})
