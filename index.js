const express = require('express');

//required sockets.io to work with websockets
const socket = require('socket.io');

// App setup- created express application. created server.
const app = express();
const PORT = 4000;
//created server and stored it in the variable
const server = app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
});

//static files
app.use(express.static('public'));

//SETUP socket.io on the frontend and server
//var io set equal to socket and invoking function and passing in the server we created above
//socket setup
let io = socket(server);

//listening for a connection. when connection is made we fire a callback function which is taking in socket
//and loggin in the console log
//also logs socket ID, the id is a socket connection. everytime a different user connects they get a 
//unique socket ID between the client and sserver
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
    //server is waiting and listening for the socket 'chat', when it gets the chat message it fires the function below
    // and receives the data that is sent. 
    socket.on('chat', (data) => {
        //then get into all sockets and emit event/message down all sockets which is the 'chat' message. send data 
        //back to all sockets
        io.sockets.emit('chat', data)
    });

    //handle listening for typing
    socket.on('typing', (data) => {
        //socket below referrs to the individual socket that sent the message. broadcast the typing message to every user except the orgiginal sender
        //(1st param)emit the typing message. (2nd param)also send the data back - data refers to the user name or the handle
        socket.broadcast.emit('typing', data);
    });

});

// io.on('connection', function(socket) {
//     console.log('made socket connection')
// });


//This is the repo for the socket chat
//https://github.com/iamshaunjp/websockets-playlist/blob/lesson-5/index.js