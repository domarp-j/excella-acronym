// ====================
// Third-Party Modules
// ====================

let _ = require('lodash');

require('dotenv-safe').load();

// ====================
// Models
// ====================

let Acronym = require('../models/acronym');

// ====================
// Setup
// ====================

let apiLink = 'https://excella-acronym-api.herokuapp.com/acronyms';

let acronymMap = {
  blank:    0,
  get:      1,
  getAll:   2,
  add:      3,
  invalid:  4
};

let welcomeMessage = {
  response_type: 'ephemeral',
  text: 'Not sure what an acronym at Excella stands for? Just ask /acronym!',
  attachments: [
    { text: 'Enter "/acronym <acronym>" to get its meaning.' },
    { text: 'Enter "/acronym get all" to get all known Excella acronyms and their definitions.' },
    { text: 'Enter "/acronym add <acronym> <meaning>" to add a new Excella acronym to the database.' },
  ]
}

// ====================
// Helper Methods
// ====================

//
// Get words for a given text, filtering out white spaces
//
let getWords = text => {
  return text.split(' ').filter(value => { return !!value });
};

//
// Based on text, determine whether an acronym is trying to be added
//
let addingAcronym = words => {
  return words[0].toLowerCase() === 'add';
};

//
// Parse Slack request text & determine what action was requested
// acronymMap shows the type of requests that are possible
//
let parse = text => {
  let words = getWords(text);

  if (!text) return acronymMap.blank;
  else if (words.length === 1) return acronymMap.get;
  else if (text.toLowerCase() === 'get all') return acronymMap.getAll;
  else if (addingAcronym(words)) return acronymMap.add;
  else return acronymMap.invalid;
};

//
// Break down acronym objects into an array of strings with the format:
// <acronym> - <meaning>
//
let displayAllAcronyms = acronyms => {
  return _.map(acronyms, acronym => {
    return { text: `${acronym.name} - ${acronym.meaning}` };
  });
};

//
// Get all acronyms & return object for Slack
//
let getAllAcronyms = next => {
  Acronym.find((err, acronyms) => {
    if (err) {
      next({
        response_type: 'ephemeral',
        text: 'Sorry, we couldn\'t process the request. Something is preventing us from getting a list of all acronyms. Please contact admin for troubleshooting.'
      });
    } else {
      next({
        response_type: 'ephemeral',
        text: 'Here are all of the acronyms currently in the database.',
        attachments: displayAllAcronyms(acronyms)
      });
    }
  });
};

// ====================
// Public Helpers
// ====================

//
// Check if Slack token & team ID match parameters on file
//
exports.match = (token, teamId) => {
  return token === process.env.SLACK_TOKEN && teamId === process.env.SLACK_TEAM_ID;
};

//
// Handle request & respond accordingly
//
exports.handleReq = (slackReq, done) => {
  let text = slackReq.text;
  let textType = parse(slackReq.text);

  switch (textType) {
  case acronymMap.blank:
    done(null, welcomeMessage);
    break;
  case acronymMap.getAll:
    getAllAcronyms(slackRes => {
      done(null, slackRes);
    });
    break;
  default:
    done(true, null)
  }
};
