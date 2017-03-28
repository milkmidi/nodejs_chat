const socketIO = require('socket.io');

function init(app, http) {
    const io = socketIO(http);
    io.on('connection', (socket) => {
        console.log('a user connected');
        // socket.emit('news', { hello: 'world' });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('message', (data) => {
            console.log(data);
            socket.broadcast.emit('message', data);
        });
    });
}
module.exports = init;
