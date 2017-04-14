// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Mockgoose = require('mockgoose').Mockgoose;

require('dotenv-safe').load();

// ====================gi
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

let validUser = {
  email: 'test@example.com',
  password: 'test-pass-123',
  passwordConfirm: 'test-pass-123'
};

// ====================
// Testing
// ====================

describe('User Controller', () => {
  afterEach(done => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('POST /users (add)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with a "user" property', (done) => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          res.body.should.have.property('user');
          done();
        });
    });

    it('should return the newly-added user as an object', done => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          res.body.user.should.have.property('email');
          res.body.user.email.should.equal(validUser.email);
          done();
        });
    });

    it('should add a valid user to the database', done => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          User.find().exec((err, users) => {
            users.length.should.equal(1);
            done();
          });
        });
    });

    it('should not add a user without an "email" parameter', done => {
      chai.request(address)
        .post('/users')
        .send({ email: undefined, password: 'test-pass-123', passwordConfirm: 'test-pass-123' })
        .end((err, res) => {
          User.find().exec((err, users) => {
            users.length.should.equal(0);
            done();
          });
        });
    });

    it('should not add a user without a "password" parameter', done => {
      chai.request(address)
        .post('/users')
        .send({ email: 'test@example.com', password: undefined, passwordConfirm: 'test-pass-123' })
        .end((err, res) => {
          User.find().exec((err, users) => {
            users.length.should.equal(0);
            done();
          });
        });
    });

    it('should not add a user without a "passwordConfirm" parameter', done => {
      chai.request(address)
        .post('/users')
        .send({ email: 'test@example.com', password: 'test-pass-123', passwordConfirm: undefined })
        .end((err, res) => {
          User.find().exec((err, users) => {
            users.length.should.equal(0);
            done();
          });
        });
    });

    it('should not add a user if "password" & "passwordConfirm" parameters do not match', done => {
      chai.request(address)
        .post('/users')
        .send({ email: 'test@example.com', password: 'test-pass-123', passwordConfirm: 'not-a-match' })
        .end((err, res) => {
          User.find().exec((err, users) => {
            users.length.should.equal(0);
            done();
          });
        });
    });
  });
});
