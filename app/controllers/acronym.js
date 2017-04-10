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
// GET Index
//
exports.index = (req, res) => {
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
// POST Create
//
exports.create = (req, res) => {
  if (!req.body.name || !req.body.meaning) {
    res.json({
      success: false,
      message: 'Acronym is not properly defined. Please ensure that "name" & "meaning" parameters are valid.',
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
// GET Show
//
exports.show = (req, res) => {
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
