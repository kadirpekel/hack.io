Hook = require('hook.io').Hook
hookio = require 'hook.io'

class HackIO extends Hook
  
  constructor: (args...) ->
    Hook.apply @, args
    @connect()
    @on 'ready', () =>
      @emit 'inputs.ready'
  
  spawn: (filenames) ->
    console.log filenames

exports.HackIO = HackIO
