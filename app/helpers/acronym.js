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
exports.capitalize = (phrase) => {
  words = phrase.split(' ');

  words = _.map(words, _.capitalize)

  return words.join(' ');
}

//
// Strip list of acronym objects so that they only have names & meanings
//
exports.strip = (acronyms) => {
  var validKey = (value, key) => {
    return _.includes(['name', 'meaning'], key)
  }

  var stripAcronym = (acronym) => {
    return _.pickBy(acronym, validKey);
  }

  return _.map(acronyms, stripAcronym);
}
