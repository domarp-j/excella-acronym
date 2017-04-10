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

let validAcronym = {
  name: 'SCALP',
  meaning: 'Skin, Connective Tissue, Aponeurosis, Loose Connective Tissue, Pericranium'
};

// ====================
// Testing
// ====================

describe('Acronym Controller', () => {
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
  describe('GET /acronyms (getAll)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with the "count" and "acronyms" properties', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('count');
          res.body.should.have.property('acronyms');
          done();
        });
    });

    it('should return all acronyms as an array of objects', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((err, res) => {
          res.body.acronyms.should.be.a('array');
          res.body.acronyms.should.have.length(testData.length);
          done();
        });
    });

    it('should return acronym objects with just the name & meaning', (done) => {
      chai.request(address)
        .get('/acronyms')
        .end((err, res) => {
          res.body.acronyms.forEach(acronym => {
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
  describe('POST /acronyms (add)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with an "acronym" property', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('acronym');
          done();
        });
    });

    it('should return the newly-added acronym as an object', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((err, res) => {
          res.body.acronym.should.have.property('name');
          res.body.acronym.should.have.property('meaning');
          res.body.acronym.name.should.equal(validAcronym.name);
          res.body.acronym.meaning.should.equal(validAcronym.meaning);
          done();
        });
    });

    it('should add a valid acronym to the database', done => {
      chai.request(address)
        .post('/acronyms')
        .send(validAcronym)
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testData.length + 1);
            done();
          });
        });
    });

    it('should not add an acronym without a "name" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: undefined, meaning: 'Meaning' })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testData.length);
            done();
          });
        });
    });

    it('should not add an acronym without a "meaning" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: 'NAME', meaning: undefined })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testData.length);
            done();
          });
        });
    });
  });

  //
  // GET Show
  //
  describe('GET /acronyms/:name (get)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .get('/acronyms/lol')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with the "count" and "acronyms" properties', (done) => {
      chai.request(address)
        .get('/acronyms/lol')
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('count');
          res.body.should.have.property('acronyms');
          done();
        });
    });

    it('should return all matching acronyms as an array of objects', (done) => {
      chai.request(address)
        .get('/acronyms/lol')
        .end((err, res) => {
          res.body.acronyms.should.be.a('array');
          res.body.acronyms.should.have.length(1);
          done();
        });
    });

    it('should return all matching acronyms as an array of objects, regardless of caps', (done) => {
      chai.request(address)
        .get('/acronyms/LOL')
        .end((err, res) => {
          res.body.acronyms.should.be.a('array');
          res.body.acronyms.should.have.length(1);
          done();
        });
    });

    it('should return more than one matching acronym, if necessary, as an array of objects', (done) => {
      chai.request(address)
        .get('/acronyms/atm')
        .end((err, res) => {
          res.body.acronyms.should.be.a('array');
          res.body.acronyms.should.have.length(2);
          done();
        });
    });

    it('should return matching acronym objects with just the name & meaning', (done) => {
      chai.request(address)
        .get('/acronyms/lol')
        .end((err, res) => {
          res.body.acronyms.forEach(acronym => {
            Object.keys(acronym).length.should.equal(2);
            acronym.should.have.property('name');
            acronym.should.have.property('meaning');
          });
          done();
        });
    });
  });
});
