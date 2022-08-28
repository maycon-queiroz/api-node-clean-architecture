const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Should disabled x-powered-by header', async () => {
    app.get('/get-x-powered-by', (request, response) => {
      response.send('Maycon')
    })

    const res = await request(app).get('/get-x-powered-by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
