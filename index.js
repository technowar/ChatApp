'use strict';

var Readline = require('readline');
var Io = require('socket.io-client')('http://localhost:3030');

var rl = Readline.createInterface({
	'input' : process.stdin,
	'output' : process.stdout
});

var nick;

rl.question('Set Nickname: ', function (data) {
	nick = data;

	Io.emit('send', {
		'type' : 'notice',
		'message' : nick + ' has joined the flow.'
	});

	rl.prompt(true);
});

rl.on('line', function (data) {
	Io.emit('send', {
		'type' : 'chat',
		'message' : data,
		'nick' : nick
	});

	rl.prompt(true);
});

Io.on('message', function (data) {
	if (data.type === 'notice') {
		return displayMsg(data.message);
	}

	return displayMsg('<' + data.nick + '> ' + data.message);
});

function displayMsg (msg) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);

	console.log(msg);

	rl.prompt(true);
}