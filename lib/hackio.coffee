path = require 'path'

Hook = require('hook.io').Hook

class HackIO extends Hook
  
  constructor: (args...) ->
    Hook.apply @, args
    @connect()
    @on 'ready', () =>
      @emit 'inputs.ready'
  
  spawn: (filenames) ->
    for filename in filenames
      do (filename) =>
        filepath = path.join process.cwd(), filename
        try
          hook = require filepath
        catch err
          console.error err
          console.log "could not import hook: '#{filepath}'"
        
        if hook
          basename = path.basename filepath, path.extname filepath
          console.log "listening #{basename}"
        
          hookbinded = (args...) =>
            hook.apply @, args
          
          @on basename, hookbinded

exports.HackIO = HackIO
