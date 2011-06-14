hack.io
=======
hack.io is a hook.io tool written in coffeescript that helps you create and manage
your own hooks on the fly.

Install
-------
```
$ npm install hack.io
```

Usage
-----
hack.io comes with an executable lets you hack hook.io in seconds.

Let's take a shot;

```
$ hackio
  command not recognized
```

Yes there are some commands you must pass. hackio consists of three fundamental components which maps
to three commands. These are:

 * server (server): starts a hookio server process
 * listener (listen): starts a hookio event listener process
 * emitter (emit): starts a hookio event emitter process

Each command takes some shared optional command line arguments. The pattern is like shown below.

```
$ hackio <command> <name> -h <host> -p <port>
```

So starting a hook.io server is damn easy.

```
$ hackio server
  hook output started: hack.io.server
```

This is the same as using the default command line argument values

```
$ hackio server hack.io.server -h 'localhost' -p 5000
  hook output started: hack.io.server
```

Great, your hook.io server is running...

Let's create a default listener. 

```
$ hackio listen
  I have connected to an output, my name there is: hack.io.listen-0
```

Listener now listens for default event 'i.test' with a default handler

``` javascript
function (name, event, data) {
	console.log(name, event, data);
}
```

Listeners takes '-e' argument lets you define which event to listen. For eg.

```
$ hackio listen -e i.anothertest
  I have connected to an output, my name there is: hack.io.listen-0
```


There is more...

Listeners could take filenames as arguments those are modules which exports a hook.io event emitter
callback. Also these filenames must be the event name that you want to listen. If you also defined '-e',
it will be omitted silently.

We may create the default hook listener above manually.

```
$ echo "module.exports = (name, event, data) -> console.log name, event, data" > i.default.coffee
$ hackio listen i.default.coffee
  I have connected to an output, my name there is: hack.io.listen-0
```

That is it, your listener hook is ready already. Go emit some events.
Btw as you see, you can create listeners using coffeescript. Yay ;)

Also don't forget that '@/this' refers the hook itself inside callback. You may want to access the container hook
reference such as below.

``` coffeescript
module.exports = (name, event, data) ->
	console.log name, event, data
	# use '@' to refer the container hook instance
	@emit "out.anotherevent" "anotherdata"
```

Emitting events are not different. 

```
$ hackio emit
  I have connected to an output, my name there is: hack.io.emit-0
```

Emitters with no arguments publishes an event named 'o.test' after reading event data from stdin.
You can pipe your other process outputs to emitter easily. That's really cool.

The 'emit' command also takes an additional arguments such '-e' which takes the event name and -d' that forms to
the event data without reading stdin.

```
$ hackio emit -e o.foo -d 'bar'
  I have connected to an output, my name there is: hack.io.emit-0
```

Another cool feature is that emitters also take filename arguments those maps to javascript modules. Modules must
export a callback function which takes the pre-initialized hook reference and returns a emit data. Again filenames
map to event names such as listener modules.

 A typical emitter module looks like below.

``` javascript
// o.foo.js

modules.exports = function (hook) {
	return "bar"
}
```

Go fire it.
```
$ hackio emit o.foo.js
  I have connected to an output, my name there is: hack.io.emit-0
```

That is. You fired an event name 'o.foo' with data 'bar'. What a hack.

--

There is a lot to write, but that is it in brief for now.

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