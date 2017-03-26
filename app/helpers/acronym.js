// ====================
// Module Dependencies
// ====================

let _ = require('lodash');

// ====================
// Helpers
// ====================

//
// Capitalize the first letter in every word of a given phrase
//
exports.capitalize = (phrase) => {
  let words = phrase.split(' ');

  words = _.map(words, _.capitalize);

  return words.join(' ');
};

//
// Strip list of acronym objects so that they only have names & meanings
//
exports.strip = (acronyms) => {
  let validKey = (value, key) => {
    return _.includes(['name', 'meaning'], key);
  };

  let stripAcronym = (acronym) => {
    return _.pickBy(acronym, validKey);
  };

  return _.map(acronyms, stripAcronym);
};
