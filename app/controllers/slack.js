// ====================
// Modules
// ====================

let jwt = require('jsonwebtoken');
let request = require('request');

// ====================
// Helpers
// ====================

let slackHelper = require('../helpers/slack');

// ====================
// Example Request Body
// ====================

// {
//   "token":"~",
//   "team_id":"~"
//   "team_domain":"~",
//   "channel_id":"~",
//   "channel_name":"~",
//   "user_id":"~",
//   "user_name":"~",
//   "command":"~",
//   "text":"~",
//   "response_url":"~"
// }

// ====================
// RESTful Methods
// ====================

exports.handle = (req, res) => {
  let slackReq = req.body;
  let token = slackReq.token;
  let teamId = slackReq.team_id;

  if (!token || !teamId) {
    res.json({
      response_type: 'ephemeral',
      text: 'Sorry, we couldn\'t process the request. Either a token or a team ID is missing from the Slack request. Please contact the admin for troubleshooting.',
      attachments: [
        { text: `The token is ${token ? 'defined' : 'not defined'}` },
        { text: `The team ID is ${teamId ? 'defined' : 'not defined'}` }
      ]
    });
  } else if (!slackHelper.match(token, teamId)) {
    res.json({
      response_type: 'ephemeral',
      text: 'Sorry, we couldn\'t process the request. The Slack slash token & team ID sent with the request do not match the token & team ID on file with the API. Please contact the admin for troubleshooting.'
    });
  } else {
    slackHelper.handleReq(slackReq, (err, slackRes) => {
      if (err) {
        res.json({
          response_type: 'ephemeral',
          text: 'Sorry, we couldn\'t process the request. Please try again. If the error persists, contact the admin for troubleshooting.'
        });
      } else {

        res.json(slackRes);
      }
    });
  }
};
