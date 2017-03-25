// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

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
// Chai HTTP
//
chai.use(chaiHttp);

//
// Port
//
let port = process.env.PORT || 8080;

// ====================
// Tests
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

//
// Testing
//
describe('Acronyms -', () => {
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
    it('should get all acronyms', (done) => {
      chai.request(`http://localhost:${port}`)
        .get('/acronyms')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
})
