#! /usr/bin/env node

var coffeescript = require('coffee-script');
var optimist = require('optimist');
var path = require('path');
var Hook = require('hook.io').Hook;


if (require.main == module) {
  var argv = optimist.argv
  var command = argv._.length && argv._[0];
  var name = argv.p || 'hack.io.' + command;
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
      hook.on('ready', function () {
        var filenames = argv._.slice(1);
        if (filenames && filenames.length) {
          for (var i in filenames) {
            var filename = filenames[i];
            if (filename.indexOf('o.') == 0) {
              var filepath = path.join(process.cwd(), filename);
              var emitter = null;
              try {
                emitter = require(filepath);
              }  catch (err) {
                console.error("could not import emitter: '" + filepath + "'");
                console.error(err.toString());
              }
              if (emitter && typeof(emitter) == 'function') {
                var basename = path.basename(filepath, path.extname(filepath));
                hook.emit(basename, emitter(hook));
              } else {
                console.error("not a proper emitter: '" + filepath + "'");
              }
            }
          }
          process.exit();
        } else {
          var buffer = "";
          if (!argv.d) {
            process.stdin.resume();
            process.stdin.setEncoding('utf8');

            process.stdin.on('data', function (chunk) {
              hook.emit(argv.e || 'o.test', chunk);
            });

            process.stdin.on('end', function () {
              process.exit();
            });
          } else {
            hook.emit(argv.e || 'o.test', argv.d);
            process.exit();
          }
        }
      });
      break;
    case 'listen':
      hook.connect();
      hook.on('ready', function () {
        var filenames = argv._.slice(1);
        if (filenames && filenames.length) {
          for (var i in filenames) {
            var filename = filenames[i];
            if (filename.indexOf('i.') == 0) {
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
                hook.on(basename, function() {
                  listener.call(hook, arguments);
                });
              } else {
                console.error("not a proper hook: '" + filepath + "'");
              }
            }
          }
        } else {
          hook.on(argv.e || "i.test.o.test", function () {
            console.log(arguments);
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