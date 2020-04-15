import { formatNumber } from '../formatting'

const YouTubeStats = (val) => {
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

export default YouTubeStats