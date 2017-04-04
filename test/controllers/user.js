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
    mongoose.createConnection(process.env.MONGODB_URI_TEST, (error) => {
      done(error);
    });
  });
});

// ====================
// Test Parameters
// ====================

//
// Test Data
//
let testData = [
  {
    email: 'hello.world@example.com',
    password: 'testing',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    email: 'goodbye.world@example.com',
    password: 'gnitset',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

//
// Valid Acronym
//
let validUser = {
  email: 'new.email@example.com',
  password: 'tgensit'
};

// ====================
// Testing
// ====================

describe('User Controller', () => {
  //
  // Test Database Seeding
  //
  beforeEach((done) => {
    User.remove({}, err => {
      testData.forEach((user, index) => {
        User.collection.insert(user).then(() => {
          if (index === testData.length - 1) done();
        });
      });
    });
  });

  //
  // GET Index
  //
  describe('GET /users (Index)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .get('/users')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with the "count" and "users" properties', (done) => {
      chai.request(address)
        .get('/users')
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('count');
          response.body.should.have.property('users');
          done();
        });
    });

    it('should return all users as an array of objects', (done) => {
      chai.request(address)
        .get('/users')
        .end((error, response) => {
          response.body.users.should.be.a('array');
          response.body.users.should.have.length(testData.length);
          done();
        });
    });

    it('should return user objects with just the email property', (done) => {
      chai.request(address)
        .get('/users')
        .end((error, response) => {
          response.body.users.forEach(user => {
            Object.keys(user).length.should.equal(1);
            user.should.have.property('email');
          });
          done();
        });
    });
  });

  //
  // POST Create
  //
  describe('POST /users (Create)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with an "email" property', done => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('email');
          done();
        });
    });

    it('should return the newly-added user\'s email', done => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((error, response) => {
          response.body.email.should.equal(validUser.email);
          done();
        });
    });

    it('should add a valid user to the database', done => {
      chai.request(address)
        .post('/users')
        .send(validUser)
        .end((error, response) => {
          User.find().exec((error, users) => {
            users.length.should.equal(testData.length + 1);
            done();
          });
        });
    });

    it('should not add a user without a valid "email" parameter', done => {
      chai.request(address)
        .post('/users')
        .send({ email: undefined, password: 'password' })
        .end((error, response) => {
          User.find().exec((error, users) => {
            users.length.should.equal(testData.length);
            done();
          });
        });
    });

    it('should not add an acronym without a valid "meaning" parameter', done => {
      chai.request(address)
        .post('/users')
        .send({ email: 'email@example.com', password: undefined })
        .end((error, response) => {
          User.find().exec((error, users) => {
            users.length.should.equal(testData.length);
            done();
          });
        });
    });
  });
});
