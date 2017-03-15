// ====================
// Helpers
// ====================

exports.capitalize = function(phrase) {
  phrase = phrase.split(' ');

  phrase.forEach(function(word, index) {
    phrase[index] = word[0].toUpperCase() + word.slice(1);
  });

  return phrase.join(' ');
}

exports.stripId = function(acronyms) {
  acronymsNew = [];

  acronyms.forEach(function(acronym) {
    acronymsNew.push({
      name: acronym.name,
      meaning: acronym.meaning
    })
  });

  return acronymsNew; 
}
