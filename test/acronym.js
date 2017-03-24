// ====================
// Third-Party Modules
// ====================

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

// ====================
// Internal Modules
// ====================

//
// Models
//
let Acronym = require('../../app/models/acronym');

//
// Server
//
let server = require('../server');

// ====================
// Setup
// ====================

//
// Assertions
//
let expect = chai.expect;

//
// Chai HTTP
//
chai.use(chaiHttp);

// ====================
// Tests
// ====================
