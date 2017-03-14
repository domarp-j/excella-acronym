// //
// // Configure dotenv-safe to handle ENV variables
// //
// require('dotenv-safe').load();
//
// //
// // Require modules
// //
// var _ = require('lodash');
//
// //
// // Slack DK for Node.js setup
// //
// var RtmClient = require('@slack/client').RtmClient;
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
// var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
//
// var bot_token = process.env.BOT_TOKEN || '';
// var bot_user_id = process.env.BOT_USER_ID || '';
//
// var rtm = new RtmClient(bot_token);
//
// //
// // Register messages & do stuff
// //
// rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
//   text = message.text || '';
//   words = text.split(' ');
//
//   bot_called = _.includes(words, '<@' + bot_user_id + '>');
//
//   if (bot_called) {
//     rtm.sendMessage("You rang?", message.channel);
//   }
// })
// rtm.start();
