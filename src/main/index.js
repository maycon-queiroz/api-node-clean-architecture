const MongoHelper = require('../infra/helper/mong-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl).then(_ => {
  const app = require('./config/app')

  app.listen(env.port, () =>
    console.log(`Server running on http://localhost:${env.port}`)
  )
})
