import axios from 'axios'
import moment from 'moment-timezone'
import { YOUTUBE_API_KEY, BASE_URL_COVID } from '../config.json'

function pushChannel(channel) {
  return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${YOUTUBE_API_KEY}&id=${channel}`)
}

function pushCountry(country, status, date) {
  let todayDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00Z`
  let customDate = `${moment(date).subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00Z`
  
  let isToday = date ? customDate : todayDate
  
  return axios.get(`${BASE_URL_COVID}live/country/${country}/status/${status}/date/${isToday}`)
}

const fetchChannel = (channelId) => {
  let listChannel

  channelId.split(',').map((e) => {
    listChannel = pushChannel(e)
  })

  return listChannel

}

const fetchCountry = (countries, status, date) => {
  let listCountry

  countries.split(',').map((e) => {
    listCountry = pushCountry(e, status, date)
  })

  return listCountry
}

export { fetchChannel, fetchCountry }