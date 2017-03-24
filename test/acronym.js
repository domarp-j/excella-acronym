// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

// ====================
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
let expect = chai.expect;

//
// Chai HTTP
//
chai.use(chaiHttp);

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
describe('Acronyms', () => {
  //
  // Seed database with test data before all tests
  //
  beforeEach((done) => {
    Acronym.remove({}, (err) => {
      testData.forEach((acronym, index) => {
        Acronym.collection.insert(acronym).then(() => {
          if (index === data.length - 1) done();
        });
      })
    });
  });
})
