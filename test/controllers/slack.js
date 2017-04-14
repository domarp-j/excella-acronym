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

let testAcronyms = [
  {
    name: 'ATM',
    meaning: 'At The Moment',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'ATM',
    meaning: 'Automated Transaction Machine',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'IRL',
    meaning: 'In Real Life',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'LOL',
    meaning: 'Laughing Out Loud',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

// ====================
// Testing
// ====================

describe('Slack Controller', () => {
  afterEach(done => {
    slackReq = Object.assign({}, slackReqParams);
    done();
  });

  it('should be status 200', done => {
    chai.request(address)
      .post('/slack')
      .send(slackReq)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should have "response_type" and "text" parameters', done => {
    chai.request(address)
      .post('/slack')
      .send(slackReq)
      .end((err, res) => {
        res.body.should.have.property('response_type');
        res.body.should.have.property('text');
        done();
      });
  });

  describe('POST /slack (handle) - valid submissions', () => {
    beforeEach(done => {
      Acronym.remove({}, err => {
        testAcronyms.forEach((acronym, index) => {
          Acronym.collection.insert(acronym).then(() => {
            if (index === testAcronyms.length - 1) done();
          });
        });
      });
    });

    // it('should get all acronyms upon request', done => {
    //   slackReq.text = 'Get All';
    //   chai.request(address)
    //     .post('/slack')
    //     .send(slackReq)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });
  });

  describe('POST /slack (handle) - invalid submissions', () => {
    it('should respond with an error message if "token" is not present', done => {
      slackReq.token = undefined;
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.text.should.include('Sorry, we couldn\'t process the request.');
          done();
        });
    });

    it('should respond with an error message if "team_id" is not present', done => {
      slackReq.team_id = undefined;
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.text.should.include('Sorry, we couldn\'t process the request.');
          done();
        });
    });

    it('should respond with an error message if token does not match token on file', done => {
      slackReq.token = slackReq.token + 'invalid';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.text.should.include('Sorry, we couldn\'t process the request.');
          done();
        });
    });

    it('should respond with an error message if token does not match team ID on file', done => {
      slackReq.token = slackReq.team_id + 'invalid';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.text.should.include('Sorry, we couldn\'t process the request.');
          done();
        });
    });
  });
});
