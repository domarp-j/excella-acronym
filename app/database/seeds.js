// ====================
// Modules
// ====================

let mongoose = require('./connection');

// ====================
// Models
// ====================

let Acronym = require('../models/acronym');

// ====================
// Seed Data
// ====================

let acronymData = [
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
];

// ====================
// Seeding
// ====================

var seed = (model, data) => {
  model.remove({}).then(() => {
    data.forEach((item, index) => {
      model.collection.insert(item).then(() => {
        if (index === data.length - 1) {
          process.exit();
        }
      });
    });
  }).catch((error) => { console.log(error); });
};

console.log('Seeding acronym data...');
seed(Acronym, acronymData);

console.log('Done!');
