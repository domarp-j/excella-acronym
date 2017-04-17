// ====================
// Third-Party Modules
// ====================

let chai = require('chai');

require('dotenv-safe').load();

// ====================gi
// Internal Modules
// ====================

//
// Helper
//
let slackHelper = require('../../app/helpers/slack');

// ====================
// Setup
// ====================

//
// Assertions
//
let should = chai.should();

// ====================
// Test Parameters
// ====================

let token = process.env.SLACK_TOKEN;
let teamId = process.env.SLACK_TEAM_ID;

// ====================
// Testing
// ====================

describe('Slack Helpers', () => {
  beforeEach(done => {
    token = process.env.SLACK_TOKEN;
    teamId = process.env.SLACK_TEAM_ID;
    done();
  });

  describe('match', () => {
    it('should return true if token & teamId match params on file', done => {
      let result = slackHelper.match(token, teamId);
      result.should.be.true;
      done();
    });

    it('should return false if token does not match', done => {
      let result = slackHelper.match(`${token}+invalid`, teamId);
      result.should.be.false;
      done();
    });

    it('should return false if teamId does not match', done => {
      let result = slackHelper.match(token, `${teamId}+invalid`);
      result.should.be.false;
      done();
    });
  });

  // TODO: add tests for slackHelper.handleReq()
});
