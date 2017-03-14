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

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);

//
// TEST
//
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log(message);
})
rtm.start();

// TODO: figure out how to get bot data from token above
