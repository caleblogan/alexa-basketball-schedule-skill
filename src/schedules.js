'use strict'
const NBA_TEAM_NAMES = require('./nba_team_names')
const NBA_SCHEDULE = require('./nba_season_schedule')

module.exports = {
    "SCHEDULES_EN_GB" : {},
    "SCHEDULES_EN_US" : {
      buildScheduleText: function(teamName) {
        if (!teamName) {
          return teamName
        }
        let team = NBA_TEAM_NAMES[teamName]
        let games = getNextNGames(team)
        let textBuffer = []
        textBuffer.push('The ' + team + ' play on the following days.\n')
        for (let i = 0; i < games.length; ++i) {
          let g = games[i]
          let homeGame = g.home === team

          let isAM = false
          let hour = g.hour
          if (hour < 12) {
            isAM = true
          }
          hour = hour >= 13 ? hour - 12 : hour
          let minutes = g.minutes

          let month = g.month + 1
          month = month < 10 ? '0' + month :  month
          let day = g.day
          day = day < 10 ? '0' + day : day
          let dateStr = '<say-as interpret-as="date">????' + month + day + '</say-as> ' +
                        'at ' + hour + (minutes ? ' ' + minutes : '') +
                        ' ' + (isAM ? 'a.m.' : 'p.m.')

          if (homeGame) {
            textBuffer.push('on ' + dateStr + ' they play the ' + g.visiting + ' at home.\n')
          } else {
            textBuffer.push('on ' + dateStr + ' they play at the ' + g.home + '.\n')
          }
          textBuffer.push('<break time="1s"/>')
        }
        return textBuffer.join('')
      },
      isValidTeamName: function(teamName) {
        return NBA_TEAM_NAMES.hasOwnProperty(teamName)
      }
    },
    "SCHEDULES_DE_DE" : {}
};

function getNextNGames(team, n) {
  if (n === undefined) {
    n = 5
  }
  let games = NBA_SCHEDULE[team]
  let nextGames = []
  for (let i = 0; i < games.length; ++i) {
    if (new Date(games[i].date) >= new Date()) {
      nextGames = games.slice(i, i + 5)
      break
    }
  }
  return nextGames
}
