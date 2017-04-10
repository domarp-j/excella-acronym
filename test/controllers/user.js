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
  describe('POST /users (Create)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
