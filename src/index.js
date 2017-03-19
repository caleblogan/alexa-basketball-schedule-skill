'use strict'

const Alexa = require('alexa-sdk')
const schedules = require('./schedules')

const APP_ID = 'amzn1.ask.skill.b2a94aa9-10a1-4d95-9207-c209900f32a9'

const handlers = {
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'))
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT')
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech)
    },
    'GetScheduleIntent': function () {
        const localSchedules = this.t('SCHEDULES')  // Gets the correct language
        const teamSlot = this.event.request.intent.slots.Team;
        let teamName;
        if (teamSlot && teamSlot.value) {
            teamName = teamSlot.value.toLowerCase()
            if (!localSchedules.isValidTeamName(teamName)) {
              teamName = null
            }
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), teamName)

        const schedule = localSchedules.buildScheduleText(teamName)

        if (schedule) {
            this.emit(':tellWithCard', schedule, cardTitle, schedule)
        } else {
            let speechOutput;
            if (teamName) {
                speechOutput = this.t('SCHEDULE_NOT_FOUND_MESSAGE', teamName)
            } else {
                speechOutput = this.t('TEAM_NOT_FOUND_MESSAGE')
            }

            this.emit(':tell', speechOutput)
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE')
        this.attributes.repromptSpeech = this.t('HELP_REPROMT')
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech)
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest')
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest')
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'))
    },
};

const languageStrings = {
    'en-GB': {
        translation: {},
    },
    'en-US': {
        translation: {
            SCHEDULES: schedules.SCHEDULES_EN_US,
            SKILL_NAME: 'Pro Basketball Schedule',
            WELCOME_MESSAGE: "Welcome to %s. You can ask a question like, what\'s the warriors schedule... Now, what can I help you with.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s - Schedule for %s.',
            HELP_MESSAGE: "You can ask questions such as, what\'s the warriors schedule, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, what\'s the warriors schedule, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            SCHEDULE_NOT_FOUND_MESSAGE: "The schedule for the %s was not found.",
            TEAM_NOT_FOUND_MESSAGE: 'I\'m sorry, I don\'t recognize that team name. Try saying the city name before... like what\'s the Chicago Bulls schedule',
        },
    },
    'de-DE': {
        translation: {},
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context)
    alexa.APP_ID = APP_ID
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings
    alexa.registerHandlers(handlers)
    alexa.execute()
};
