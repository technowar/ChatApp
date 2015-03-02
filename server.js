'use strict';

var Io = require('socket.io')();

Io.on('connection', function (socket) {
	socket.on('send', function (data) {
		Io.emit('message', data);
	});
});

Io.listen(3030);
