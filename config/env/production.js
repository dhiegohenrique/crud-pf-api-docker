module.exports = {
  env: 'production',
  db: process.env.MONGODB_URI,
  port: process.env.PORT,
  url_client: ['https://crud-pf-client.herokuapp.com']
}
