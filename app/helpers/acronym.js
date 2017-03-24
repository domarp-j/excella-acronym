// ====================
// Module Dependencies
// ====================

var _ = require('lodash');

// ====================
// Helpers
// ====================

//
// Capitalize the first letter in every word of a given phrase
//
exports.capitalize = function(phrase) {
  words = phrase.split(' ');

  words = _.map(words, _.capitalize)

  return words.join(' ');
}

//
// Strip list of acronym objects so that they only have names & meanings
//
exports.strip = function(acronyms) {
  // acronymsNoId = [];
  //
  // acronyms.forEach(function(acronym) {
  //   acronymsNoId.push({
  //     name: acronym.name,
  //     meaning: acronym.meaning
  //   })
  // });
  //
  // return acronymsNoId;

  var validKey = function(value, key) {
    return _.includes(['name', 'meaning'], key)
  }

  var stripAcronym = function(acronym) {
    return _.pickBy(acronym, validKey);
  }

  return _.map(acronyms, stripAcronym);
}
