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
// Valid Acronym
//
let validAcronym = {
  name: 'SCALP',
  meaning: 'Skin, Connective Tissue, Aponeurosis, Loose Connective Tissue, Pericranium'
};

//
//

// ====================
// Testing
// ====================

describe('Acronym', () => {
  //
  // Test Database Seeding
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

    it('should return a JSON object with the "count" and "acronyms" properties', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((error, response) => {
          response.body.should.be.a('object');
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
        .send(validAcronym)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with an "acronym" property', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('acronym');
          done();
        });
    });

    it('should return the newly-added acronym as an object', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((error, response) => {
          response.body.acronym.should.have.property('name');
          response.body.acronym.should.have.property('meaning');
          response.body.acronym.name.should.equal(validAcronym.name);
          response.body.acronym.meaning.should.equal(validAcronym.meaning);
          done();
        });
    });

    it('should add a valid acronym to the database', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((error, response) => {
          Acronym.find().exec((error, acronyms) => {
            acronyms.length.should.equal(testData.length + 1);
            done();
          });
        });
    });

    it('should not add an acronym without a valid "name" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: undefined, meaning: 'Meaning' })
        .end((error, response) => {
          Acronym.find().exec((error, acronyms) => {
            acronyms.length.should.equal(testData.length);
            done();
          });
        });
    });

    it('should not add an acronym without a valid "meaning" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: 'NAME', meaning: undefined })
        .end((error, response) => {
          Acronym.find().exec((error, acronyms) => {
            acronyms.length.should.equal(testData.length);
            done();
          });
        });
    });
  });

  //
  // GET Show
  //
  // describe('GET /acronym/:name (Show)', () => {
  //   it('should be status 200', (done) => {
  //     chai.request(address)
  //       .get(`/acronyms/${}`)
  //       .end((error, response) => {
  //         response.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
