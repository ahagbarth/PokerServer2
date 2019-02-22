// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;

io.on('connection', (socket) => {
   console.log('one user connected '+socket.id);



    socket.on('CHAT' , function (data) {
        console.log('======CHAT message========== ');
        console.log(data);
        socket.emit('CHAT',data);

    });

    socket.on('disconnect',function(){
        console.log('one user disconnected '+socket.id);
    });

});