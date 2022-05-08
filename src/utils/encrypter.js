const bcrypt = require('bcrypt')

module.exports = exports = class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
