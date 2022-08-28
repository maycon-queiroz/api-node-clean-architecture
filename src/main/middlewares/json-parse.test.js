const request = require('supertest')
const app = require('../config/app')

describe('JSON Parse Middlewares', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test_json_parse', (request, response) => {
      response.send(request.body)
    })

    await request(app)
      .post('/test_json_parse')
      .send({ name: 'Maycon' })
      .expect({ name: 'Maycon' })
  })
})
