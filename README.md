# Excella Acronym API

The Excella Acronym API provides quick and easy access to all of the acronyms frequently used within Excella Consulting.

## Details

* Created as a RESTful API using Node.js and Express
* MongoDB is utilized for data storage
* [Mongoose](http://mongoosejs.com/) is used as the MongoDB ORM

## Requirements

* Node.js
* Node Package Manager (NPM)
* MongoDB

## Using the API

Note: The app has not yet been deployed. In the development environment, it will run by default on `localhost:8080`.

* `GET /acronyms` returns all of the acronyms currently within the database
* `GET /acronyms/:name` returns all acronyms with the given name parameter
* `POST /acronyms` adds an acronym to the database. The `name` of the acronym, along with its `meaning`, must be provided as parameters.

## Installation Instructions

* Fork and clone the git repository
* Make sure that you `$ cd` into the excella-acronym-api directory
* Run `$ npm install` to install all of the Node.js packages & libraries
* Run `$ node database/seeds.js` to seed test data for the database (optional)
* Run `$ node .` or `$ node server.js` to run the server

## License

(TBD)
