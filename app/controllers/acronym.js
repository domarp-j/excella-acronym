// ====================
// Models
// ====================

let Acronym = require('../models/acronym');

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');

// ====================
// RESTful Methods
// ====================

//
// Get all acronyms
//
exports.getAll = (req, res) => {
  Acronym.find((err, acronyms) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        message: 'Here are all of the Excella acronyms currently in the database.',
        count: acronyms.length,
        acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
      });
    }
  });
};

//
// Create an acronym
//
exports.add = (req, res) => {
  if (!req.body.name || !req.body.meaning) {
    res.json({
      success: false,
      message: 'Acronym is not properly defined. Please ensure that "name" & "meaning" parameters are present.',
      name: req.body.name || '(undefined)',
      meaning: req.body.meaning || '(undefined)'
    });
  } else {
    let acronym = new Acronym();

    acronym.name = req.body.name;
    acronym.meaning = req.body.meaning;

    acronym.save((err) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
          message: 'A new Excella acronym has been added to the database.',
          acronym: appHelper.strip(acronym, ['name', 'meaning'])
        });
      }
    });
  }
};

//
// Get a specific acronym
//
exports.get = (req, res) => {
  let name = req.params.name.toUpperCase();

  Acronym.find({ name: name }, (err, acronyms) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        message: `Here are all of the Excella acronym meanings for ${name}`,
        count: acronyms.length,
        acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
      });
    }
  });
};
