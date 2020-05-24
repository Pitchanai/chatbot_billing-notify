const dotenv = require('dotenv')
dotenv.config()

const config = {
  lineConfig: {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  },
}

module.exports = config