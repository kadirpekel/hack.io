#! /usr/bin/env node

var coffeescript = require('coffee-script');
var optimist = require('optimist');
var path = require('path');
var Hook = require('hook.io').Hook;

if (require.main == module) {
  var argv = optimist.argv
  var command = argv._.length && argv._[0];
  var name = argv._.length > 1 && argv._[1] || 'hack.io.' + command;
  var hook = new Hook({
    name: name,
    host: argv.h || 'localhost',
    port: argv.port || 5000
  });
  
  switch (command) {
    case 'server':
      hook.listen();
      break;
    case 'emit':
      hook.connect();
      hook.on('ready', function (name, event, data) {
        try {
          hook.emit('o.hack.io', argv.d);
        } catch (err) {
          console.error(err.toString());
        }
      });
      break;
    case 'listen':
      hook.connect();
      hook.on('ready', function (name, event, data) {
        var filenames = argv._.slice(name && 1 || 0);
        if (filenames && filenames.length) {
          for (var i in filenames) {
            var filename = filenames[i];
            var filepath = path.join(process.cwd(), filename);
            var listener = null;
            try {
              listener = require(filepath);
            }  catch (err) {
              console.error("could not import hook: '" + filepath + "'");
              console.error(err.toString());
            }
            if (listener && typeof(listener) == 'function') {
              var basename = path.basename(filepath, path.extname(filepath));
              hook.on(basename, function(name, event, data) {
                listener.call(hook, name, event, data);
              });
            } else {
              console.error("not a proper hook: '" + filepath + "'");
            }
          }
        } else {
          hook.on("i.hack.io", function (name, event, data) {
            console.log(name, event, data);
          });
        }
      });
      break;
    default:
      console.error('command not recognized');
      process.exit(1);
      break;
  }
}