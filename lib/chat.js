'use strict';

var App = require('../');

var Readline = require('readline');

var rl = Readline.createInterface({
	'input' : process.stdin,
	'output' : process.stdout
});

var nick;
var userOptions = {};

exports.options = {
	'setNickname' : function () {
		rl.question('Set Nickname: ', function (data) {
			nick = data;

			userOptions.type = 'notice';
			userOptions.message = nick + ' has joined the flow.';

			App.options.emitMessages(userOptions);

			rl.prompt(true);
		});
	},
	'setMessages' : function () {
		rl.on('line', function (data) {
			userOptions.type = 'chat';
			userOptions.message = data;
			userOptions.nick = nick;

			App.options.emitMessages(userOptions);

			rl.prompt(true);
		});
	},
	'relayMessages' : function (msg) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);

		console.log(msg);

		rl.prompt(true);
	}
};
