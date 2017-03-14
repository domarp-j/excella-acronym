//
// Configure dotenv-safe to handle ENV variables
//
require('dotenv-safe').config();

console.log(process.env.TEST);

// var RtmClient = require('@slack/client').RtmClient;
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
//
// var bot_token = process.env.SLACK_BOT_TOKEN || '';
//
// var rtm = new RtmClient(bot_token);
