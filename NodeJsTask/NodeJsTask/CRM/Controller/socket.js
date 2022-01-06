
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let SOCKET={}
io.on('connection', function (socket) {
    SOCKET.client=socket;
   console.log('A user connected',socket.id);
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
   socket.join("UserRoom");
   //set SocketId corresponding to userId in Redis
});
app.listen(5000, () => console.log("*******Server is running*******"));
console.log("abhi");
module.exports={SOCKET}
