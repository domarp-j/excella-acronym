//
// Require connection
//
let mongoose = require('./connection');

//
// Define Model
//
let Acronym = require('../models/acronym');

//
// Seed Data
//
let data = [
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
Acronym.remove({}).then(() => {
  console.log('Adding seed data acronyms...')
  data.forEach((acronym, index) => {
    Acronym.collection.insert(acronym).then(() => {
      if (index === data.length - 1) {
        console.log('Done!');
        process.exit();
      }
    });
  })
}).catch(error => { console.log(error); })
