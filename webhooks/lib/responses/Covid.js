import moment from 'moment-timezone'

import { formatNumber } from '../formatting'

const Covid = (val) => {
  if (val.data.length > 0) {
    const {
      Country, CountryCode, Confirmed,
      Deaths, Recovered, Active, Date
    } = val.data[0]

    return {
      "author": {
        "name": `${Country} (${CountryCode})`,
      },
      "fields": [
        {
          "name": "Confirmed",
          "value": formatNumber(Confirmed),
          "inline": true
        },
        {
          "name": "Deaths",
          "value": formatNumber(Deaths),
          "inline": true
        },
        {
          "name": "Recovered",
          "value": formatNumber(Recovered),
          "inline": true
        },
        {
          "name": "Active",
          "value": formatNumber(Active),
          "inline": true
        },
        {
          "name": "Last Updated",
          "value": moment(Date).locale('id').format('DD MMM YYYY, HH:mm'),
          "inline": false
        },
      ],
      "color": 3122943
    }
  } else {
    return {
      "fields": [
        {
          "name": "Empty",
          "value": '-',
          "inline": true
        }
      ]
    }
  }

}

export default Covid