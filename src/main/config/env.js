module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean_node_api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
