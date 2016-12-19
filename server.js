var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var ball = {
    'x': 100,
    'y': 100
}
server = http.createServer(function(req,res){
  fs.readFile('app.html',function(err, data){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(data);
  })
}).listen(88,function(){
    console.log("listening");
});
var sock = io.listen(server);
sock.sockets.on('connection',function(socket){
        socket.on('move',function(req){
            ball.y += parseInt(req.y);
            ball.x += parseInt(req.x);
            sock.emit('ball',{'x':ball.x,'y':ball.y});
        })
});