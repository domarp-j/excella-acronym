// ====================
// Module Dependencies
// ====================

// Third-Party Modules
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

// Models
var Acronym = require('../../app/models/acronym');

// Server
var server = require('../server');

// ====================
// Setup
// ====================

// Assertions
var expect = chai.expect;
