import axios from 'axios'

import { Covid, YouTubeStats, Mabar } from './responses'

function responseJson(val, key) {
  switch (key) {
    case 'wajibwibu':
      return YouTubeStats(val)
    case 'mabar':
      return Mabar()
    case 'covid':
      return Covid(val)
    default:
      return YouTubeStats(val)
  }
}

const embedResponse = (listData, discordHooks, res, key) => {
  let embeds = []
  let payload = {
    success: false,
    status: 0,
    message: '',
    error: null
  }

  return Promise.all(listData).then(async (values) => {
    values.map((val) => { embeds.push(responseJson(val, key)) })

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

    } catch (e) {
      throw e
    }
  }).catch((e) => {
    throw e
  })
}

export { embedResponse }