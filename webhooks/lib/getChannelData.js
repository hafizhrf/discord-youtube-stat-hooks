import axios from 'axios'
import { YOUTUBE_API_KEY } from '../config.json'

function pushChannel(channel) {
  return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${YOUTUBE_API_KEY}&id=${channel}`)
}

const fetchChannel = (channelId) => {
  let listChannel

  channelId.split(',').map((e) => {
    listChannel = pushChannel(e)
  })

  return listChannel

}

export { fetchChannel }