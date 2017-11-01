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
var fs = require('fs');
// var wstream = fs.createWriteStream('videoBinary.txt');
var wstream = fs.createWriteStream('videoBinary1.txt');
io.on('connection', function(socket){
  socket.emit('news', { hello: 'world' });
  socket.on('stream', function( data ){
    console.log('data:------- ', data)
    console.log('time:-- ', (new Date()).toISOString(),'data recieved:- ', data);
    // var buffArr = new ArrayBuffer(data);
    // console.log('buffArr:---- ',buffArr);
    wstream.write(data);
    fs.writeFile("videoBinary1.bin", data,  "binary",function(err) { 
      if(err){ console.log(err);} 
      else {
        //console.log('write done!')
      }
      });
    //socket.broadcast.emit('stream', data)

    socket.broadcast.emit('stream', data)
  })
  socket.on('end', function(data){
    console.log('called');
    res.end();
  })
})



http.listen(port, function(){
  log.info('Server started listening at port ', port)
})
