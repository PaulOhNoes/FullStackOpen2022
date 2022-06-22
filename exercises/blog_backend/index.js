const config = require('./utils/config')
const app = require('./app')
const http = require('http')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${config.PORT}`)
})