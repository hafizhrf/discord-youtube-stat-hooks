import axios from 'axios'
import { formatNumber } from './formatting'

function responseJson(val) {
  const { snippet, statistics } = val.data.items[0]

  return {
    "author": {
      "name": snippet.title,
      "icon_url": snippet.thumbnails.default.url
    },
    "fields": [
      {
        "name": "Subscribers",
        "value": formatNumber(statistics.subscriberCount),
        "inline": true
      },
      {
        "name": "Viewers in Total",
        "value": formatNumber(statistics.viewCount),
        "inline": true
      },
      {
        "name": "Videos in Total",
        "value": formatNumber(statistics.videoCount),
        "inline": false
      }
    ],
    "color": 3122943
  }
}

const embedResponse = (channels, discordHooks, res) => {
  let embeds = []
  let payload = {
    success: false,
    status: 0,
    message: '',
    error: null
  }

  return Promise.all(channels).then(async (values) => {
    values.map((val) => { embeds.push(responseJson(val)) })

    try {
      let result = await axios.post(discordHooks, { embeds }, {
        headers: { 'Content-Type': `application/json` }
      })

      if (result) {
        payload.success = true
        payload.status = 200
        payload.message = 'Success Get Data'
      } else {
        payload.status = 400
        payload.message = 'Failed Get Data'
      }
      
      res.send(payload)
      
    } catch(e) {
      throw e
    }
  }).catch((e) => {
    throw e
  })
}

export { embedResponse }