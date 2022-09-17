const express = require("express");
//const path = require("path");
const ejs = require('ejs');
const app = express();
const server = require('http').createServer(app);


app.use(express.static(__dirname + '/public'));

app.set('view-engine', 'ejs')

const PORT = process.env.PORT || 3000;


app.get('/', (req, res)=>{

  
  res.render('index.ejs');
})

server.listen(PORT, () => {
  console.log(`server is running on port  ${PORT}`);
});

const users = {}

const io = require('socket.io')(server, {cors : {origin:"*"}})

io.on('connection', (socket) => {
    console.log('Connected...' + socket.id)
    socket.on('new-user', name=> {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name);
    })
    socket.on('send-chat-message', msg => {
        socket.broadcast.emit('chat-message', {msg:msg, name: users[socket.id]});
    })
    socket.on('disconnect', ()=>{
      socket.broadcast.emit('user-disconnected', `${users[socket.id]}`);
      delete users[socket.id]
    })

})
