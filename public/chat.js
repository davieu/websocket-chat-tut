//make connection
const URL = 'http://localhost:4000';
//making connection by making socket equal to io.connect. which connects to the server.
//when we load the index html file in the browser it makes the connection and the connection in the 
//server index is listening for the connection. when it connects it console logs/
const socket = io.connect(URL);

//query DOM
let message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//EMIT events

// listen for click event. when someone clicks on SEND button we fire a callback 
//function. we want to emit/send a event/message.
btn.addEventListener('click', () => {
    //we created this socket when we said io.connect. We then .emit which emits a message down the websocket to the server
    //emit function takes 2 params. 1st- is name of message 'chat'. 2nd- what the actual data is or message sending to server
    //the object that is sent has the values of the message and handle that is being sent. The data being sent.
    //emitting 'chat' message thats going to the server down the websocket. send the data to the server {message, handle}
    socket.emit('chat', {
        message: message.value, 
        handle: handle.value,

    });
});

message.addEventListener('keypress', () => {

    //emits/sends the handle.value to the server when user is typing. The handle.value is the user name.
    socket.emit('typing', handle.value);
});

//listen for events
//listen for 'chat' event from server(chat message)
//fire a callback on clientside with the data and output it to the DOM
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    //innerHTML += to assign different html to the output div.
    //data.handle and data.message is the data that is sent.
    output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});

//listen for the 'typing' message. fire callback function which is user handle. output user handle to the browser
socket.on('typing', (data) => {
    //data is handle.value. which is the username of the person typing
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
});

//overview
//basic chat. passing data from the client to the server then back from the server to all different clients.

//emit message from client when clicked on sent button. that message sent some data to server
//server listened for it. Then emitted a message back to every single client including the original client who sent the message.

// when we click send clientside eventlistener is listening for the click. It says grab socket betwen this client(the browser)
//and emit a chat message and send {handle.value and message.value} data  to server. server is saying im listening to 
//all my sockets. when I hear that 'chat' message sent to me im going to fire callback function. I'm going to receive the data
//and pass it to its own function. server grabs all sockets to whichever clients are connected to server and emit the chat 
//message data to all the different clients.
//then in frontend socket.on('chat', (data)) listens for chat message coming back from server. fires callback function
//which is taking the data that comes with it and output the data to the innerhtml of the output div in the DOM.

//broadcasting- if we were to emit a message from the client to the server. The server listens to it. the server then
//broadcasts the message and sends the message down every websocket (every client) except the 
//original client who sent it. 