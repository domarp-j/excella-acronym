// ====================
// Third-Party Modules
// ====================

let chai = require('chai');

// ====================gi
// Internal Modules
// ====================

//
// Helper
//
let appHelper = require('../../app/helpers/app');

// ====================
// Setup
// ====================

//
// Assertions
//
let should = chai.should();

// ====================
// Testing
// ====================

describe('App Helpers', () => {
  describe('capitalize', () => {
    let phrase = appHelper.capitalize('this is a phrase');

    it('should capitalize the first letter in a phrase', (done) => {
      phrase.should.equal('This Is A Phrase');
      done();
    });
  });

  describe('strip', () => {
    let obj = appHelper.strip({
      name: 'ATM',
      meaning: 'At The Moment',
      useless: 'useless',
      alsoUseless: 'alsoUseless'
    }, ['name', 'meaning']);

    it('should strip an object so it only has the name & meaning', (done) => {
      Object.keys(obj).length.should.equal(2);
      obj.should.have.property('name');
      obj.should.have.property('meaning');
      done();
    });
  });

  describe('stripAll', () => {
    let objArray = appHelper.stripAll([{
      name: 'ATM',
      meaning: 'At The Moment',
      useless: 'useless',
      alsoUseless: 'alsoUseless'
    }, {
      name: 'LOL',
      meaning: 'Laugh Out Loud',
      pointless: 'pointless',
      soPointless: 'soPointless'
    }], ['name', 'meaning']);

    it('should strip an array of objects', (done) => {
      objArray.forEach(obj => {
        Object.keys(obj).length.should.equal(2);
        obj.should.have.property('name');
        obj.should.have.property('meaning');
      });
      done();
    });
  });
});
