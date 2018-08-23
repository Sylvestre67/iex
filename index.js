var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nasdaq = require('./data/nasdaq');
var iexSocket;

app.use(express.static('build'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/build//index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    // Connect to iexSocket
    iexSocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/last');

    // Register events callback
    iexSocket.on('message', message => {
        console.log(message);
        socket.emit('new quote', JSON.parse(message));
    });

    iexSocket.on('connect', () => {
        console.log('iex connected');
        // Subscribe
        iexSocket.emit('subscribe', 'FB,AAPL,GOOGL,SNAP,ALTABA,MSFT');
        //nasdaq.nasdaq.sort().slice(0,15).join(',')
    });

    socket.on('disconnect', function(){
        // Kill
        iexSocket.disconnect();
        console.log('user disconnected');
    });
});

http.listen(3030, function(){
    console.log('listening on *:3030');
});