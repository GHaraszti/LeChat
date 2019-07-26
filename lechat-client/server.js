const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const http = require('http');
const https = require('https');

const httpPort = 8080;
const httpsPort = 443;

// const ts = require('ts-node').register();
const React = require('react');

const ReactDOMServer = require('react-dom/server');

//Socket setup
const server = http.createServer(app);
const io = socketIO(server);

//react components
// const Login = React.createFactory(require('./dist/login.js'));
//React.createFactory(require('./src/components/login_server'))

//Serving static files
app.use(express.static(path.join(__dirname, '')));

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date()
  };
};

io.on('connection', (socket) =>{
  console.log('New user connected');

  socket.on('addPost', function (post){
    console.log('New message posted.', post);
    io.emit("newPost",generateMessage("Juanita", "Hi everyone."));
  });

  socket.on('broadcastPost', function (){
    console.log("New comment has been posted");
    
    socket.broadcast.emit("newPost");
  });

  socket.on('disconnect', function (){
    console.log('New user disconnection');
    socket.removeAllListeners();
  });

  // socket.emit('newPost', generateMessage("Admin", "Welcome to LeChat"));

  // setTimeout(()=>{
  //   io.emit("newPost", generateMessage("Unknown", "This is a message from an unknown user."))
  // }, 10000)
});

//CORS able
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', (req, res, next) => {

// });

// app.all('*', (request, response, next) => {
//   response.status(404).send('Not found... did you mean to go to /about instead?')
// });

app.use((error, request, response, next) => {
  console.error(request.url, error)
  response.send('Wonderful, something went wrong...')
});

// app.use(errorHandler);

server.listen(httpPort, ()=>{
    console.log(`HTTP server is listening on ${httpPort}`)
});