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
// Strip an object so that it only has properties defined in 'keys' array
//
exports.strip = (obj, keys) => {
  let validKey = (value, key) => {
    return _.includes(keys, key);
  };

  return _.pickBy(obj, validKey);
};

//
// Strip an array of acronym objects so that it only has properties in 'keys'
//
exports.stripAll = (objs, keys) => {
  return _.map(objs, (obj) => {
    return exports.strip(obj, keys);
  });
};
