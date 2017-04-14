// ====================
// Helpers
// ====================

//
// Check if Slack token & team ID match parameters on file
//
exports.match = (token, teamId) => {
  return token === process.env.SLACK_TOKEN && teamId === process.env.SLACK_TEAM_ID;
};

//
// Handle request & respond accordingly
//
exports.handleReq = (slackReq, done) => {

};
