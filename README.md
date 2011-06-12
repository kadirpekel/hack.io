hack.io
=======
hack.io is a hook.io binding that helps you create your own hooks on the fly.

Install
-------
```
$ git clone https://coffeemate@github.com/coffeemate/hack.io.git
$ cd hack.io
$ npm install
```

Usage
-----
hack.io comes with an executable let you hack hook.io in seconds.

Create a module that exports hook.io event emitter callback with a filename that maps to an
event name like shown below.

```
$ echo "module.exports = (name, event, data) -> console.log data" > in.log.coffee
$ hackio in.log.coffee
  listening 'in.log'
```

That is it, your hook is ready already. Go emit some events with hook.io to fire your hooks.

Take a look at examples.

<https://github.com/coffeemate/hack.io/tree/master/examples>

Todo
----

 * Add lots of console argument centric options such '$ hackio myhook 127.0.0.1 5001'
 * Add a hook.io server tool such '$ hackio-server 127.0.0.1 5001'
 * Add a hook.io emitter tool such '$ hackio-emit blaevent blabla'

Disclaimer
----------
This is a very much in progress work, follow for updates <http://twitter.com/kadirpekel>

Licence
-------
Copyright (c) 2011 Kadir Pekel.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.