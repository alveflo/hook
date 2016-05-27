module.exports = function(directory) {
  var watch = require('node-watch');
  var dir = directory + "/**/*.j"
  var ws = require('ws').Server;
  var websocket;

  var server = new ws({ port: 81 });
  var notify = function(wsock) {
    if (wsock) {
      wsock.send('exit');
    } else {
    }
  }

  server.on('connection', function(wsock) {
    websocket = wsock;
    wsock.on('message', function(message) { console.log ('Received: %s', message) });
  });

  watch(directory, { recursive: true }, function() {
    notify(websocket);
  });
}
