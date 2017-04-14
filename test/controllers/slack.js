// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Mockgoose = require('mockgoose').Mockgoose;

require('dotenv-safe').load();

// ====================
// Internal Modules
// ====================

//
// Models
//
let Acronym = require('../../app/models/acronym');

//
// Server
//
let server = require('../../server');

// ====================
// Setup
// ====================

//
// Assertions
//
let should = chai.should();

//
// Port
//
let port = process.env.PORT;
let address = `http://localhost:${port}`;

//
// Chai HTTP
//
chai.use(chaiHttp);

//
// Mockgoose (Test Database Connection)
//
let mockgoose = new Mockgoose(mongoose);
before((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.createConnection(process.env.MONGODB_URI_TEST, (err) => {
      done(err);
    });
  });
});

// ====================
// Test Parameters
// ====================

let slackReqParams = {
  token: process.env.SLACK_TOKEN,
  team_id: process.env.SLACK_TEAM_ID,
  team_domain: 'team_domain',
  channel_id: 'channel_id',
  channel_name: 'channel_name',
  user_id: 'user_id',
  user_name: 'user_name',
  command: '/command',
  text: '',
  response_url: ''
}

let slackReq = Object.assign({}, slackReqParams);

// ====================
// Testing
// ====================

describe('Slack Controller', () => {
  afterEach(done => {
    slackReq = Object.assign({}, slackReqParams);
    done();
  });

  describe('POST /slack (handle)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
