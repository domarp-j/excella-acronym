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
let port = process.env.PORT || 8080;
let address = `http://localhost:${port}`;

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
];

//
// New Acronym
//
let newAcronym = {
  name: 'SCALP',
  neaming: 'Skin Connective Tissue Aponeurosis Loose Connective Tissue Pericranium'
};

// ====================
// Testing
// ====================

describe('Acronym', () => {
  //
  // Seed database with test data before all tests
  //
  beforeEach((done) => {
    Acronym.remove({}, err => {
      testData.forEach((acronym, index) => {
        Acronym.collection.insert(acronym).then(() => {
          if (index === testData.length - 1) done();
        });
      });
    });
  });

  //
  // GET Index
  //
  describe('GET /acronym (Index)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return an object with the correct properties', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('message');
          response.body.should.have.property('count');
          response.body.should.have.property('acronyms');
          done();
        });
    });

    it('should return all acronyms as an array of objects', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.body.acronyms.should.be.a('array');
          response.body.acronyms.should.have.length(testData.length);
          done();
        });
    });

    it('should return acronym objects with just the name & meaning', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.body.acronyms.forEach(acronym => {
            Object.keys(acronym).length.should.equal(2);
            acronym.should.have.property('name');
            acronym.should.have.property('meaning');
          });
          done();
        });
    });
  });

  //
  // POST Create
  //
  describe('POST /acronym (Create)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/acronyms')
        .send(newAcronym)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return an object with the correct properties', done => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('message');
          response.body.should.have.property('count');
          response.body.should.have.property('acronyms');
          done();
        });
    });
  });
});
