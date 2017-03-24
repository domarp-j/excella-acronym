//
// Require connection
//
var mongoose = require('./connection');

//
// Define Model
//
var Acronym = require('../models/acronym');

//
// Seed Data
//
var data = [
  {
    name: 'ATM',
    meaning: 'At The Moment',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'ATM',
    meaning: 'Automated Transaction Machine',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'IRL',
    meaning: 'In Real Life',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    name: 'FML',
    meaning: 'Fudge Malarkey Loco',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]

//
// Reset & Seed
// WARNING: Running this seed removes all current entries in the database!
//
console.log('Removing all acronyms...')
Acronym.remove({}).then(function() {
  console.log('Adding seed data acronyms...')
  data.forEach(function(acronym, index) {
    Acronym.collection.insert(acronym).then(function() {
      if (index === data.length - 1) {
        console.log('Done!');
        process.exit();
      }
    });
  })
}).catch(function(error) { console.log(error); })
