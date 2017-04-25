# Excella Acronym API

The Excella Acronym API provides quick and easy access to all of the acronyms frequently used within Excella Consulting.

## Details

* Created as a RESTful API using Node.js and Express
* MongoDB is utilized for data storage
* [Mongoose](http://mongoosejs.com/) is used as the MongoDB ORM
* Tested with [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai)
* Linting with [ESLint](https://github.com/eslint/eslint)

## Requirements

* Node.js
* Node Package Manager (NPM)
* MongoDB

## Using the API

Heroku: https://excella-acronym-api.herokuapp.com/

* `GET /acronyms` returns all of the acronyms currently within the database
* `GET /acronyms/:name` returns all acronyms with the given name parameter
* `POST /acronyms` adds an acronym to the database. The `name` of the acronym, its `meaning`, and a user authentication `token` must be provided as parameters.
* `DELETE /acronyms` deletes an acronym from the database. The `name` of the acronym, its `meaning`, and a user authentication `token` must be provided as parameters.
* `POST /users` adds a user to the database. An `email`, `password`, and `passwordConfirm` must be provided as parameters.
  * This route is currently disabled in production.
* `POST /auth` authenticates a user & returns a token for use in other routes. An `email` and `password` must be provided as parameters.
* `POST /slack` is a way for the Excella Slack team's slash command integration (/acronym) to communicate with the API. The `token` and `team_id` parameters are required to access any of the API routes. Check out [this link](https://api.slack.com/slash-commands) for details on integrating Slack slash commands. The /acronym slash commands are the following:
  * /acronym - Get instructions on how the acronym works
  * /acronym (acronym) - Get the meaning of (acronym)
  * /acronym get all - Get all acronyms in the database
    * Since only 100 attachments (acronyms) can be returned on Slack, this command is currently disabled in production.
  * /acronym add (acronym) (meaning) - Add (acronym) and its (meaning) to the database
  * /acronym remove (acronym) (meaning) - Remove (acronym) and its (meaning) from the database

## Installation Instructions

* Fork and clone the git repository
* Make sure that you `$ cd` into the excella-acronym-api directory
* Run `$ npm install` to install all of the Node.js packages & libraries
* Run `$ node database/seeds.dev.js` to seed test data for the database (optional)
* Run `$ node .`, `$ node server.js`, or `$ npm start`  to run the application

## Maintenance

* Run `$ npm test` to run test suite
* Run `$ npm run linter` to run linter
* Run `$ npm run linter-fix` to run linter & automatically make fixes (where possible)

## License

ISC License (Open Source)
