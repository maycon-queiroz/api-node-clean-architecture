const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helper/mong-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    const userModel = await MongoHelper.getCollection('users')
    const user = userModel.findOne({ email }, { projection: { password: 1 } })
    return user
  }
}
