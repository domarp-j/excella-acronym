// Require connection
var mongoose = require('./connection');

// Define Model
var Acronym = require('./models/acronym');

// Seed Data
var data = [
  {
    name: 'ATM',
    meaning: 'At The Moment'
  }, {
    name: 'ATM',
    meaning: 'Automated Transaction Machine'
  }, {
    name: 'IRL',
    meaning: 'In Real Life'
  }, {
    name: 'FML',
    meaning: 'Fudge Malarkey Loco'
  }
]

// Reset & Seed
Acronym.remove({}).then(function() {
  data.forEach(function(acronym, index) {
    Acronym.collection.insert(acronym).then(function() {
      if (index === data.length - 1) process.exit();
    });
  })
}).catch(function(error) { console.log(error); })
