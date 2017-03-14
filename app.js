//
// Configure dotenv-safe to handle ENV variables
//
require('dotenv-safe').load();

//
// Slack DK for Node.js setup
//
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var bot_token = process.env.BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);

//
// Register messages & do stuff
//
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  text = message.text || '';
  words = text.split(' ');
})
rtm.start();
