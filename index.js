// Import packages
import express from 'express'
import bodyParser from 'body-parser'

// Lib
import { embedResponse } from './lib/responseJson'
import { fetchChannel, fetchCountry } from './lib/getChannelData'

// App
const app = express()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const {
    key, discordHooks,
    channelIds,

    countries, status, date
  } = req.query

  let listChannels = []
  let listCountries = []

  if (key) {
    switch (key) {
      case 'wajibwibu':
        let getChannel = fetchChannel(channelIds)
        listChannels.push(getChannel)

        embedResponse(listChannels, discordHooks, res, key)
        break;
      case 'mabar':
        embedResponse([''], discordHooks, res, key)
        break;
      case 'covid':
        if (!date) {
          let getCountry = fetchCountry(countries, status, null)
          listCountries.push(getCountry)
        } else{
          let getCountry = fetchCountry(countries, status, date)
          listCountries.push(getCountry)
        }

        embedResponse(listCountries, discordHooks, res, key)
    }
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
