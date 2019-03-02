// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//Calls Deck class to generate deck and shuffle deck
const deck = require('./Cards.js');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));


// Chatroom

var users = [];
var waitingList = [];
var numUsers = 0;
var userPosition; 



var cardDeck = deck.createPack();
var myDeck = deck.shufflePack(cardDeck);
var firstThreeCardsTable = deck.draw(myDeck, 3);
var secondRoundCard = deck.draw(myDeck, 1);
var finalRoundCard = deck.draw(myDeck, 1);
console.log(firstThreeCardsTable);
console.log(secondRoundCard);
console.log(finalRoundCard);




var tableState;
var gameState = "Ready";

io.on('connection', (socket) => {
  var addedUser = false;
  userPosition = users.indexOf(socket.username);

 



  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;

if(numUsers > 5) {
  tableState = "unavailable";
  waitingList.push(socket.username);
} else {
  tableState = "available";
  users.push(socket.username);
}
   
  
    
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers,
      tableState: tableState,
      users: users,
      waitingList: waitingList
      


    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      users: users
    });



//////////////////Game Logic //////////////////////////////

  if(/*users.length > 1 && */gameState == "Ready") {

    var cardDeck = deck.createPack();
    var myDeck = deck.shufflePack(cardDeck);
    var firstThreeCardsTable = deck.draw(myDeck, 3);

    
      socket.emit('game start', {
        firstThreeCardsTable: firstThreeCardsTable
      });
    



  } else if(gameState == "RoundOne") {
    
    
  } else if(gameState == "RoundTwo") {

  } else if(gameState == "FinalRound") {

  }



/////////////////////////////////////////////////////////////

  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;
    
    users.splice( userPosition, 1 );
    waitingList.splice(waitingList.indexOf(socket.username), 1);

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers,
        users: users
      });
    }
  });



});