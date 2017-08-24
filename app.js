let express = require('express');
let app = new express();
let http = require('http').Server(app);

let io = require('socket.io')(http);
var Log = require('log');
var log = new Log();

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.redirect('index.html');
})

io.on('connection', function(socket){

  socket.on('stream', function(image){
    socket.broadcast.emit('stream', image)
  })
})

http.listen(port, function(){
  log.info('Server started listening at port ', port)
})
