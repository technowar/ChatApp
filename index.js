'use strict';

var Readline = require('readline');
var Io = require('socket.io-client')('http://localhost:3030');

var rl = Readline.createInterface({
	'input' : process.stdin,
	'output' : process.stdout
});

rl.question('Set Nickname: ', function (nick) {
	Io.emit('send', {
		'type' : 'notice',
		'message' : nick + ' has joined the flow'
	});

	rl.prompt(true);
});