module.exports = (name, event, data) ->
  console.log name, event, data
  @emit 'in.echo', data