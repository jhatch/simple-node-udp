// run: `node server`
// test: `nc -u 127.0.0.1 33333`
var dgram  = require('dgram');
var server = dgram.createSocket('udp4');
var phrase = new Buffer('braj\n');
var PORT   = '33333';
var local  = '127.0.0.1';

server.on('listening', function () {
  console.log('UDP Server listening on %s', PORT);
});

server.on('message', function (message, remote) {
  console.log('incoming request from=%s:%s body=%s', remote.address, remote.port, message);

  var client = dgram.createSocket('udp4');
  client.send(phrase, 0, phrase.length, 2115, local, function () {
    client.close();
  });
});

server.bind(PORT, local);