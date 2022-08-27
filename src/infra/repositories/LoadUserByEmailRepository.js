const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  load (email) {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }
    if (!email) {
      throw new MissingParamError('email')
    }

    const user = this.userModel.findOne(
      { email },
      { projection: { password: 1 } }
    )
    return user
  }
}
