// ====================
// Modules
// ====================

let jwt = require('jsonwebtoken');
let rp = require('request-promise');

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
      text: 'Sorry, the request couldn\'t be processed. Either a token or a team ID is missing from the Slack request. Please reach out to Pramod Jacob to troubleshoot the problem.',
      attachments: [
        { text: `The token is ${token ? 'defined' : 'not defined'}` },
        { text: `The team ID is ${teamId ? 'defined' : 'not defined'}` }
      ]
    });
  } else if (!slackHelper.match(token, teamId)) {
    res.json({
      response_type: 'ephemeral',
      text: 'Sorry, the request couldn\'t be processed. The Slack slash token & team ID sent with the request do not match the token & team ID on file with the API. Please reach out to Pramod Jacob to troubleshoot the problem.'
    });
  } else {
    slackHelper.handleReq(slackReq, (err, slackRes) => {
      if (err) {
        res.json({
          response_type: 'ephemeral',
          text: 'Sorry, the request couldn\'t be processed. Try sending your request again. If the error persists, reach out to Pramod Jacob to troubleshoot the problem.'
        });
      } else {
        let options = {
          method: 'POST',
          uri: slackReq.response_url,
          body: {
            response_type: 'ephemeral',
            text: 'Got it! Processing your acronym request...'
          },
          json: true
        };

        rp(options)
          .then(body => {
            console.log(body);
            res.json(slackRes);
          })
          .catc(err => {
            console.log(err);
          });
      }
    });
  }
};
