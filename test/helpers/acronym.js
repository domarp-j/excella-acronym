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
let acronymHelper = require('../../app/helpers/acronym');

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

describe('Acronym Helpers', () => {
  describe('capitalize', () => {
    let phrase = acronymHelper.capitalize('this is a phrase');

    it('should capitalize the first letter in a phrase', (done) => {
      phrase.should.equal('This Is A Phrase');
      done();
    });
  });

  describe('strip', () => {
    let obj = acronymHelper.strip({
      name: 'ATM',
      meaning: 'At The Moment',
      useless: 'useless',
      alsoUseless: 'alsoUseless'
    });

    it('should strip an object so it only has the name & meaning', (done) => {
      Object.keys(obj).length.should.equal(2);
      obj.should.have.property('name');
      obj.should.have.property('meaning');
      done();
    });
  });

  describe('stripAll', () => {
    let objArray = acronymHelper.stripAll([{
      name: 'ATM',
      meaning: 'At The Moment',
      useless: 'useless',
      alsoUseless: 'alsoUseless'
    }, {
      name: 'LOL',
      meaning: 'Laugh Out Loud',
      pointless: 'pointless',
      soPointless: 'soPointless'
    }]);

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
