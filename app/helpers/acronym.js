// ====================
// Helpers
// ====================

// Capitalize the first letter in every word of a given phrase
exports.capitalize = function(phrase) {
  phrase = phrase.split(' ');

  phrase.forEach(function(word, index) {
    phrase[index] = word[0].toUpperCase() + word.slice(1);
  });

  return phrase.join(' ');
}

// Return list of acronyms without _id field
exports.stripId = function(acronyms) {
  acronymsNoId = [];

  acronyms.forEach(function(acronym) {
    acronymsNoId.push({
      name: acronym.name,
      meaning: acronym.meaning
    })
  });

  return acronymsNoId;
}
