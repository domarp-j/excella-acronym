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
let User = require('../../app/models/user');

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

let testUser = new User({
  email: 'test@example.com',
  password: 'test-pass-123'
});

let validUser = {
  email: testUser.email,
  password: testUser.password
};

// ====================
// Testing
// ====================

describe('Auth Controller', () => {
  before(done => {
    User.remove({}, err => {
      testUser.save(err => {
        if (err) throw err;
        done();
      });
    });
  });

  after(done => {
    User.remove({}, err => {
      if (err) throw err;
      done();
    });
  });

  describe('POST /auth (authenticate)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/auth')
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with "email" and "token" properties', (done) => {
      chai.request(address)
        .post('/auth')
        .send(validUser)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return a JSON object with "email" and "token" properties', (done) => {
      chai.request(address)
        .post('/auth')
        .send(validUser)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return a JSON object with a fail message if user is not found', (done) => {
      chai.request(address)
        .post('/auth')
        .send({ email: `invalid-${validUser.email}`, password: validUser.password })
        .end((err, res) => {
          res.body.message.should.eq('Authentication failed. User was not found.');
          done();
        });
    });

    it('should return a JSON object with a fail message if password is not correct', (done) => {
      chai.request(address)
        .post('/auth')
        .send({ email: validUser.email, password: `invalid-${validUser.password}` })
        .end((err, res) => {
          res.body.message.should.eq('Authentication failed. Password was incorrect.');
          done();
        });
    });
  });
});
