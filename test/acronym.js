// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

require('dotenv-safe').load();

// ====================gi
// Internal Modules
// ====================

//
// Models
//
let Acronym = require('../app/models/acronym');

//
// Server
//
let server = require('../server');

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
let port = process.env.PORT || 8080;

//
// Chai HTTP
//
chai.use(chaiHttp);

// ====================
// Test Parameters
// ====================

//
// Test Data
//
let testData = [
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
]

// ====================
// Testing
// ====================

describe('Acronym', () => {
  //
  // Seed database with test data before all tests
  //
  beforeEach((done) => {
    Acronym.remove({}, (err) => {
      testData.forEach((acronym, index) => {
        Acronym.collection.insert(acronym).then(() => {
          if (index === testData.length - 1) done();
        });
      })
    });
  });

  //
  // GET Index
  //
  describe('GET /acronym', () => {
    it('should be status 200', (done) => {
      chai.request(`http://localhost:${port}`)
        .get('/acronyms')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return an object with the correct properties', (done) => {
      chai.request(`http://localhost:${port}`)
        .get('/acronyms')
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('message');
          response.body.should.have.property('count');
          response.body.should.have.property('acronyms');
          done();
        });
    });

    it('should return all of the acronyms as an array of objects', (done) => {
      chai.request(`http://localhost:${port}`)
        .get('/acronyms')
        .end((error, response) => {
          response.body.acronyms.should.be.a('array');
          response.body.acronyms.should.have.length(testData.length);
          done();
        });
    });
  });
})
