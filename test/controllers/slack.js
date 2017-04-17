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

    it('should return a welcome message if text is blank', done => {
      slackReq.text = '';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.eq('Not sure what an acronym at Excella stands for? Just ask /acronym!');
          res.body.attachments[0].text.should.eq('Enter "/acronym <acronym>" to get its meaning.');
          res.body.attachments[1].text.should.eq('Enter "/acronym get all" to get all known Excella acronyms and their definitions.');
          res.body.attachments[2].text.should.eq('Enter "/acronym add <acronym> <meaning>" to add a new Excella acronym to the database.');
          done();
        });
    });

    it('should get all acronyms upon request', done => {
      slackReq.text = 'Get All';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.eq('Here are all of the acronyms currently in the database.');
          res.body.attachments.should.be.a('array');
          res.body.attachments.should.have.length(testAcronyms.length);
          done();
        });
    });

    it('should get a specific acronym upon request', done => {
      slackReq.text = 'IRL';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.eq('IRL means \"In Real Life\".');
          done();
        });
    });

    it('should get a specific acronym upon request, regardless of caps', done => {
      slackReq.text = 'irl';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.eq('IRL means \"In Real Life\".');
          done();
        });
    });

    it('should get a specific acronym upon request, even if it has multiple meanings', done => {
      slackReq.text = 'ATM';
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.eq('ATM could mean one of the following:');
          res.body.attachments.should.be.a('array');
          res.body.attachments[0].text.should.include('At The Moment');
          res.body.attachments[1].text.should.include('Automated Transaction Machine');
          done();
        });
    });

    it('should respond properly when an acronym isn\'t in the database', done => {
      slackReq.text = 'GGG',
      chai.request(address)
        .post('/slack')
        .send(slackReq)
        .end((err, res) => {
          res.body.response_type.should.eq('ephemeral');
          res.body.text.should.include(`Sorry, we couldn\'t find the meaning of ${slackReq.text}.`);
          done();
        });
    });
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
