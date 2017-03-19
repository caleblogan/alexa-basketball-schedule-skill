const request = require('request')

const NBA_GAME_LOGS_ENDPOINT = 'http://stats.nba.com/stats/teamgamelog/?TeamID=1610612737&Season=2016-01&SeasonType=Regular%20Season'

// request(NBA_GAME_LOGS_ENDPOINT, function (error, response, body) {
//   if (error) {
//     console.log('error:', error)
//   }
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// request.get({url:NBA_GAME_LOGS_ENDPOINT, json:true}, function(err, res, body) {
//   if (err) {
//     console.log('error:', er)
//   }
//   console.log(body['resultSets'][0]['rowSet'][0])
// })


const SCHEDULE = require('../src/nba_season_schedule')

function getNextNGames(team, n) {
  if (n === undefined) {
    n = 5
  }
  let games = SCHEDULE[team]
  let nextGames = []
  for (let i = 0; i < games.length; ++i) {
    if (new Date(games[i].date) >= new Date()) {
      nextGames = games.slice(i, i + 5)
      break
    }
  }
  return nextGames
}
let d = new Date(getNextNGames('warriors')[0].date)
console.log(getNextNGames('warriors')[0])
console.log(d)
console.log(d.toString())
console.log(d.getMonth() + 1)
console.log(d.getDate())

// let d = new Date(SCHEDULE['warriors'][SCHEDULE['warriors'].length-1].date)
// console.log(d)
// console.log(d.toString())
// let hour = d.getHours()
// hour = hour >= 13 ? hour % 12 : hour
// let minutes = d.getMinutes()
// console.log(hour + ':' + minutes)
//
// let month = d.getMonth() + 1
// let day = d.getDate()
// console.log(month + '/' + day)
