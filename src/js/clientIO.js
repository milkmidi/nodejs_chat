const socket = io();
const listenerArr = [];


export function init() {
    console.log('init');
    socket.on('message', (data) => {
        console.log('on message');
        for (const a in listenerArr) {
            listenerArr[a].call(null, data);
        }
    });
}
export function emit({ chat, message, created_date, who }) {
    console.log('socket emit', chat, message);
    socket.emit('message', { chat, message, created_date, who });
}
export function addListener(cb) {
    listenerArr.push(cb);
}
