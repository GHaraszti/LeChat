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

//Initializing ENV vars

//ENV variables
// const api_hostname = process.env.API_HOSTNAME || "localhost"
// const api_port = process.env.API_PORT || 3000;
// const client_hostname = process.env.CLIENT_HOSTNAME || "localhost"
const client_port = process.env.CLIENT_PORT || 8080;

console.log("This is the api host", process.env.API_HOST);

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

      // socket.emit("listen", ()=>{
      //     console.log("Watch  out!!!!");
      // });


      socket.on('listen', ()=>{
        console.log("Im listening client...")
      })

      socket.on('joinRooms', (params) => {
        // if(!isRealString(params.name) || !isRealString(params.room)) {
        //   callback('Name and room name are required.');
        // }
        console.log("Which rooms are you subscribing to: ", ...params);

        params.forEach(convo => {
          socket.join(convo._id);
        });

        // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //setTimeout(()=>{socket.broadcast.to(params[0]._id).emit('listen')}, 5000);

        // callback();
      });

      socket.on('addPost', function (post){
        console.log('New message posted.', post);
        io.to(post.convoID).emit("newPost",generateMessage("Juanita", "Hi everyone."));
      });

      socket.on('broadcastPost', function (params){
        console.log("New comment has been posted", params.convoID);
        
        socket.broadcast.to(params.convoID).emit("newPost");
      });

      socket.on('disconnect', function (){
        console.log('New user disconnection');
        //socket.removeAllListeners();
      });

      // socket.emit('newPost', generateMessage("Admin", "Welcome to LeChat"));

      // setTimeout(()=>{
      //   io.emit("listen", "Heeeey, listen!!!")
      // }, 10000);
});

//CORS able
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

app.get('*', (req, res, next) => {
  res.redirect("/");
});

// app.all('*', (request, response, next) => {
//   response.status(404).send('Not found... did you mean to go to /about instead?')
// });

app.use((error, request, response, next) => {
  console.error(request.url, error)
  response.send('Wonderful, something went wrong...')
});

// app.use(errorHandler);

server.listen(client_port, ()=>{
    console.log(`HTTP server is listening on ${client_port}`)
});