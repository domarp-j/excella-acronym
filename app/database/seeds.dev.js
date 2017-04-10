//
// IMPORTANT! THIS SEEDS FILE SHOULD ONLY BE USED IN A DEV ENVIRONMENT!
//

// ====================
// Modules
// ====================

let mongoose = require('./connection');

require('dotenv-safe').load();

// ====================
// Models
// ====================

let Acronym = require('../models/acronym');
let User = require('../models/user');

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

let userData = [
  {
    email: 'test1@example.com',
    password: process.env.SEED_USER_PASS,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    email: 'test2@example.com',
    password: process.env.SEED_USER_PASS,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    email: 'test3@example.com',
    password: process.env.SEED_USER_PASS,
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
  }).catch((err) => { console.log(err); });
};

console.log('Seeding acronym data...');
seed(Acronym, acronymData);

console.log('Seeding user data...');
seed(User, userData);

console.log('Done!');
