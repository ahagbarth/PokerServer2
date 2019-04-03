// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//Calls Deck class to generate deck and shuffle deck
const deck = require('./Cards.js');
const compare = require('./HandStrength.js');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));




var cardDeck = deck.createPack();
var myDeck = deck.shufflePack(cardDeck);
var firstThreeCardsTable = deck.draw(myDeck, 3);
var secondRoundCard = deck.draw(myDeck, 1);
var finalRoundCard = deck.draw(myDeck, 1);
var userHand;
var userHandCompare;


var tableState;


//////////////////


    ////////////

io.on('connection', (socket) => {

  var addedUser = false;
  
/*
  var cardDeck = deck.createPack();
  var myDeck = deck.shufflePack(cardDeck);
  var firstThreeCardsTable = deck.draw(myDeck, 3);
  */
    

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
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

  

   socket.on('ReceiveCard', ()=>{
      userHand = deck.draw(myDeck, 2);
         socket.emit('hand', {

            userHand: userHand
      });
        
    });

    socket.on('EndGameResults', ()=>{

      socket.emit('HandCompare', {
        userHandCompare:userHandCompare
      });

    });
    


//////////////////Game Logic //////////////////////////////
/*
socket.on("roomName", ()=>{


});
*/
socket.on('add user', (username) => {

  

  socket.on('room', (roomName)=>{
    
    socket.join(roomName, (room) => {
      var currentBet = 0;
      var tableBet = 0;
      var gameState;
      var turnState =0;
      var maxRoundBet = 0;
      var usersFold = [];
      var usersStillPlaying = [];
      // Chatroom

var users = [];
var waitingList = [];
var numUsers = 0;
var userPosition = 0; 
     // when the client emits 'add user', this listens and executes
         
          if (addedUser) return;
      
          // we store the username in the socket session for this client
          socket.username = username;
          
          
          if(numUsers > 5) {
            tableState = "unavailable";
      
      
            waitingList.push(socket.username);
          } else {
            tableState = "available";
            users.push(socket.username);
            userPosition = users.indexOf(socket.username);
          }
      
          ++numUsers;
          addedUser = true;
          
          io.to(roomName).emit('login', {
            numUsers: numUsers,
            tableState: tableState,
            users: users,
            waitingList: waitingList,
            userPosition: userPosition
          });
          // echo globally (all clients) that a person has connected
          socket.to(roomName).emit('user joined', {
            username: socket.username,
            numUsers: numUsers,
            users: users
          });   


// when the user disconnects.. perform this
socket.on('disconnect', () => {
  if (addedUser) {
    socket.leave(roomName);
    --numUsers;

    users.splice( userPosition, 1 );
    waitingList.splice(waitingList.indexOf(socket.username), 1);

    // echo globally that this client has left
    socket.to(roomName).emit('user left', {
      username: socket.username,
      numUsers: numUsers,
      users: users
    });
  }
});



  
      socket.on('fold', (data)=>{
        usersFold.push(socket.username);
      });
  
      socket.on('callBet', ()=>{
  
        io.to(roomName).emit('betCall',)
  
      });
  
  
      socket.on('betAmount', (data)=> {
        currentBet = data.betValue;
        var better = data.username;
  
        if(currentBet > maxRoundBet){
          maxRoundBet = currentBet;
        } else {
  
        }
  
        socket.to(roomName).emit('betMoney', {
          currentBet: currentBet,
          better: better
        });
  
  
      });
  
      socket.on('pass_turn', ()=>{
      // if(numUsers > 1) {
          //if(users.indexOf(socket.username) == turnState){
            io.to(roomName).emit('passTurn', {
              turnState: turnState,
              maxRoundBet: maxRoundBet
              
            })
  
          //}
          turnState += 1;
          if(turnState>numUsers-1){
            turnState = 0;
          }
      // }   
  
  
      });
       
  
  
      socket.on('change game state', () => {
   
      tableBet = maxRoundBet;
  
      if (tableState == "unavailable") {
  
      } else {
          
      }
  
  
        
     if(gameState == 0) {
       cardDeck = deck.createPack();
        myDeck = deck.shufflePack(cardDeck);
  
  
  
        
  
        io.to(roomName).emit('game start', {
          firstThreeCardsTable: firstThreeCardsTable
        });
  
        
      } else if(gameState == 1) {
        tableState = "unavailable";
       
        firstThreeCardsTable = deck.draw(myDeck, 3);
  
        
  
        io.to(roomName).emit('roundOne', {
          firstThreeCardsTable: firstThreeCardsTable,
          gameState: gameState,
          tableBet: tableBet,
          roomName: roomName
        });
  
      } else if(gameState == 2) {
  
  
        secondRoundCard = deck.draw(myDeck, 1);
  
        io.to(roomName).emit('roundTwo', {
          secondRoundCard: secondRoundCard,
          gameState: gameState,
          tableBet: tableBet
        });
  
      } else if(gameState == 3) {
  
        finalRoundCard = deck.draw(myDeck, 1);
  
        io.to(roomName).emit('roundThree', {
          finalRoundCard: finalRoundCard,
          gameState: gameState,
          tableBet: tableBet
        });
  
      } else if(gameState == 4) {
  
        userHandCompare = compare.handStrength(userHand, firstThreeCardsTable, secondRoundCard, finalRoundCard);
        
  
  
        io.to(roomName).emit('finalRound', {
          gameState: gameState,
          tableBet: tableBet
        });
  
  
  
  
      }
  
      gameState += 1;
  
        if(gameState == 5) {
          tableState = "available";
          gameState = 0;
        }
  
  
  
      });
  
  
  
   
    });
    });
  





/////////////////////////////////////////////////////////////

});
});