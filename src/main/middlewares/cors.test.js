const request = require('supertest')
const app = require('../config/app')

describe('App Setup', () => {
  test('Should enable CORS', async () => {
    app.get('/test-cors', (request, response) => {
      response.send('Maycon')
    })

    const res = await request(app).get('/test-cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
