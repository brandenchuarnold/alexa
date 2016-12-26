'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.482c2d10-52fa-4c28-901b-03264078a771';

var languageStrings = {
    "en-GB": {
        "translation": {
            "FLIPS": [
                "Heads.",
                "Tails."
            ],
            "SKILL_NAME" : "British Coin Flip",
            "GET_FLIP_MESSAGE" : "Here's your flip: ",
            "HELP_MESSAGE" : "You can say flip a coin, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "FLIPS": [
                "Heads.",
                "Tails."
            ],
            "SKILL_NAME" : "American Coin Flip",
            "GET_FLIP_MESSAGE" : "Here's your flip: ",
            "HELP_MESSAGE" : "You can say flip a coin, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFlip');
    },
    'GetNewFlipIntent': function () {
        this.emit('GetFlip');
    },
    'GetFlip': function () {
        // Get a random coin flip
        var factArr = this.t('FLIPS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FLIP_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
