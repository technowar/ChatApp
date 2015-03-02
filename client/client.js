'use strict';

var Chat = require('../lib/chat');

var Io = require('socket.io-client')('http://localhost:3030');

Chat.options.setNickname();
Chat.options.setMessages();

Io.on('message', function (data) {
	if (data.type === 'notice') {
		return Chat.options.relayMessages(data.message);
	}

	return Chat.options.relayMessages('<' + data.nick + '> ' + data.message);
});

exports.options = {
	'emitMessages' : function (userOptions) {
		Io.emit('send', userOptions);
	}
};