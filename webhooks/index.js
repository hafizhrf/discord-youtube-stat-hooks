// Import packages
import express from 'express'
import bodyParser from 'body-parser'

// Lib
import { embedResponse } from './lib/responseJson'
import { fetchChannel } from './lib/getChannelData'

// App
const app = express()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let channels = []

  if (req.query.key && req.query.key == 'wajibwibu') {
    let listChannel = fetchChannel(req.query.channelIds)
    channels.push(listChannel)

    embedResponse(channels, req.query.discordHooks, res)
  } else {
    let payload = {
      success: false, status: 400,
      message: 'Failed', error: true
    }

    res.send(payload)
  }
})

// Starting server
app.listen('1337', () => {
  console.log(`Server started at port: 1337`)
})
