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
// Strip an acronym object so that it only has name & meaning properties
//
exports.strip = (acronym) => {
  let validKey = (value, key) => {
    return _.includes(['name', 'meaning'], key);
  };

  return _.pickBy(acronym, validKey);
};

//
// Strip an array of acronym objects
//
exports.stripAll = (acronyms) => {
  return _.map(acronyms, exports.strip);
};
