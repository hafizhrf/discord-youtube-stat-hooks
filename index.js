// Import packages
const express = require('express')
const morgan = require('morgan')
const axios = require('axios');
const bodyParser = require("body-parser");
// App
const app = express()
// Morgan
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// First route

app.get('/', (req, res) => {
  let channels = [];
  if(req.query.key && req.query.key == 'wajibwibu'){
      req.query.channelIds.split(',').map((e)=>{
        channels.push(axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=[YOUR_YOUTUBE_API_KEY]&id=${e}`))
      })
      let embeds = []
      Promise.all(channels).then(function(values) {
        values.map((val) => {
          embeds.push({
            "author": {
              "name": val.data.items[0].snippet.title,
              "icon_url":  val.data.items[0].snippet.thumbnails.default.url
            },
            "fields": [
              {
                "name": "Subscribers",
                "value": val.data.items[0].statistics.subscriberCount,
                "inline": true
              },
              {
                "name": "Viewers in Total",
                "value": val.data.items[0].statistics.viewCount,
                "inline": true
              },
              {
                "name": "Videos in Total",
                "value": val.data.items[0].statistics.videoCount,
                "inline": true
              }
            ],
            "color": 3122943
          })
        })
        axios.post(req.query.discordhooks,{
          embeds
        },{
          headers: { 'Content-Type': `application/json` }
        }).then(() => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 200
          }, null, 3));
        })
      });
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.status(400).end(JSON.stringify({
        status: 400
      }, null, 3));
    }
  })


  // Starting server
  app.listen('1337')
