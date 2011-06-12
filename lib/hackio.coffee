Hook = require('hook.io').Hook
hookio = require 'hook.io'

class HackIO extends Hook
  
  constructor: (@filenames) ->
    Hook.call @, name: 'hackio', host: 'localhost', port: 5000
    @connect()
    @on 'ready', () =>
      @emit 'inputs.ready'
  
  spawn: () ->

exports.HackIO = HackIO
