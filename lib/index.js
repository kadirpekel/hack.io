#! /usr/bin/env node

var coffeescript = require('coffee-script');
var hackio = require('./hackio.coffee');

HackIO = exports.HackIO = hackio.HackIO;

if (require.main == module) {
  new HackIO(process.argv.slice(2)).spawn()
}
