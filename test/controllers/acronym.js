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

let testAcronyms = [
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
  meaning: 'Skin, Connective Tissue, Aponeurosis, Loose Connective Tissue, Pericranium',
  token: undefined
};

let existingAcronym = Object.assign({}, testAcronyms[0]);

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

describe('Acronym Controller', () => {
  //
  // Need to sign in with a user & get token
  //
  before(done => {
    User.remove({}, err => {
      testUser.save(err => {
        if (err) throw err;
        chai.request(address)
          .post('/auth')
          .send(validUser)
          .end((err, res) => {
            validAcronym.token = res.body.token;
            existingAcronym.token = res.body.token;
            done();
          });
      });
    });
  });

  //
  // Reset acronym in database
  //
  beforeEach(done => {
    Acronym.remove({}, err => {
      testAcronyms.forEach((acronym, index) => {
        Acronym.collection.insert(acronym).then(() => {
          if (index === testAcronyms.length - 1) done();
        });
      });
    });
  });

  //
  // Delete all users
  //
  after(done => {
    User.remove({}, err => {
      if (err) throw err;
      done();
    });
  });

  //
  // GET /acronyms
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
          res.body.acronyms.should.have.length(testAcronyms.length);
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
  // GET /acronyms/:name
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

  //
  // POST /acronyms
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
            acronyms.length.should.equal(testAcronyms.length + 1);
            done();
          });
        });
    });

    it('should not add an acronym without a "name" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: undefined, meaning: validAcronym.meaning, token: validAcronym.token })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });

    it('should not add an acronym without a "meaning" parameter', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: validAcronym.name, meaning: undefined, token: validAcronym.token })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });

    it('should not add an acronym if a token is not provided', done => {
      chai.request(address)
        .post('/acronyms')
        .send({ name: validAcronym.name, meaning: validAcronym.meaning, token: undefined })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });

    it('should not add an acronym that already exists', done => {
      let existingAcronym = testAcronyms[0];
      chai.request(address)
        .post('/acronyms')
        .send({ name: existingAcronym.name, meaning: existingAcronym.meaning, token: validAcronym.token })
        .end((err, res) => {
          res.body.should.have.property('message');
          res.body.message.should.eq(`An acronym with the name ${existingAcronym.name} and meaning ${existingAcronym.meaning} is already present within the database.`);
          done();
        });
    });
  });

  //
  // DELETE /acronyms
  //
  describe('DELETE /acronyms (remove)', () => {
    it('should be status 200', (done) => {
      chai.request(address)
        .delete('/acronyms')
        .send(existingAcronym)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a JSON object with an "acronym" property', done => {
      chai.request(address)
        .delete('/acronyms')
        .send(existingAcronym)
        .end((err, res) => {
          res.body.should.have.property('acronym');
          done();
        });
    });

    it('should return the deleted acronym as an object', done => {
      chai.request(address)
        .delete('/acronyms')
        .send(existingAcronym)
        .end((err, res) => {
          res.body.acronym.should.have.property('name');
          res.body.acronym.should.have.property('meaning');
          res.body.acronym.name.should.equal(existingAcronym.name);
          res.body.acronym.meaning.should.equal(existingAcronym.meaning);
          done();
        });
    });

    it('should remove the acronym from the database', done => {
      chai.request(address)
        .delete('/acronyms')
        .send(existingAcronym)
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length - 1);
            done();
          });
        });
    });

    it('should remove the acronym from the database, regarless of caps', done => {
      chai.request(address)
        .delete('/acronyms')
        .send({ name: existingAcronym.name.toLowerCase(), meaning: existingAcronym.meaning.toLowerCase(), token: existingAcronym.token })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length - 1);
            done();
          });
        });
    });

    it('should not delete an acronym without a "name" parameter', done => {
      chai.request(address)
        .delete('/acronyms')
        .send({ name: undefined, meaning: existingAcronym.meaning, token: existingAcronym.token })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });

    it('should not delete an acronym without a "meaning" parameter', done => {
      chai.request(address)
        .delete('/acronyms')
        .send({ name: existingAcronym.name, meaning: undefined, token: existingAcronym.token })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });

    it('should not delete an acronym if a token is not provided', done => {
      chai.request(address)
        .delete('/acronyms')
        .send({ name: existingAcronym.name, meaning: existingAcronym.token, token: undefined })
        .end((err, res) => {
          Acronym.find().exec((err, acronyms) => {
            acronyms.length.should.equal(testAcronyms.length);
            done();
          });
        });
    });
  });
});
