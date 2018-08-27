var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nasdaq = require('./data/nasdaq');
var fetch = require('node-fetch');
var iexSocket;

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3030;

app.use(express.static('build'));

app.get('/api/nasdaq', function (req, res) {

    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${nasdaq.nasdaq.slice(0, 10).join(',')}&types=quote,news,chart&range=1m&last=1`)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function (json) {
            res.json(json);
        });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');

    // Connect to iexSocket
    iexSocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');

    // Register events callback
    iexSocket.on('message', message => {
        console.log(message);
        socket.emit('new quote', JSON.parse(message));
    });

    iexSocket.on('connect', () => {
        console.log('iex connected');
        // Subscribe
        iexSocket.emit('subscribe', nasdaq.nasdaq.join(','));

        // 'FB,AAPL,GOOGL,SNAP,ALTABA,MSFT');
        //nasdaq.nasdaq.sort().slice(0,15).join(',')
    });

    socket.on('disconnect', function () {
        // Kill
        iexSocket.disconnect();
        console.log('user disconnected');
    });
});

http.listen(port, function () {
    console.log('listening on *:3030');
});