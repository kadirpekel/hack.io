#! /usr/bin/env node

var coffeescript = require('coffee-script');
var hackio = require('./hackio.coffee');

HackIO = exports.HackIO = hackio.HackIO;

if (require.main == module) {
  
  // parse these from input args
  var name = 'hackio';
  var host = 'localhost';
  var port = 5000;
  
  // init
  var client = new HackIO({name: name, host: host, port: port});
  
  // listen for 'ready' event to spawn hooks
  client.on("inputs.ready", function(name, event, data) {
    client.spawn(process.argv.slice(2));
  });
}
