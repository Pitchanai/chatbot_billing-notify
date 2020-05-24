'use strict'

const dotenv = require('dotenv')
const line = require('@line/bot-sdk')
const express = require('express')

const client = require('./core/lineClient')
const config = require('./core/config')

dotenv.config()

// const client = new line.Client(config)
const app = express()

app.post(
  '/partner/line/webhook/message',
  line.middleware(config.lineConfig),
  (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err)
        res.status(500).end()
      })
  }
)

async function handleEvent(event) {
  console.log(event);
  if (event.mode !== "active") {
    // verify Webhook URL
    return Promise.resolve(null);
  }
  if (event.type == "follow") {
    return;
  } else if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: `Please try again.`,
    });
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Success'
  })
}

// listen on port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})