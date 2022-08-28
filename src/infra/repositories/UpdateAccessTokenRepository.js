const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helper/mong-helper')

class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }

    const userModel = await MongoHelper.getCollection('users')
    await userModel.updateOne({ _id: userId }, { $set: { accessToken } })
  }
}
exports.UpdateAccessTokenRepository = UpdateAccessTokenRepository
