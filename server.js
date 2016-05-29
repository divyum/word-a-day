// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var schema   = mongoose.Schema;
// var db = mongoose.connection;
mongoose.connect('mongodb://localhost/word-a-day');

// db.on('error', console.error);
// db.once('open', function() {
var words_schema = new schema({
  word      : String,
  meaning    : String,
  updated_at : Date,
  published  : Boolean
});

var words_db = mongoose.model('words', words_schema);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
// app.use(express.static(__dirname + '/public'));
// Chatroom
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/myaction', function(req, res) {
  console.log("word: " + req.body.word)
  console.log("meaning: " + req.body.meaning)
  var word_to_add = new words_db({
    word        : req.body.word,
    meaning     : req.body.meaning,
    updated_at  : Date.now(),
    published   : false
  });
  word_to_add.save(function(err) {
    if (err) {
      console.log(err);
    } else {
    console.log('new word added');
    }
  });
});

app.get('/get_words', function(req, res) {
  words_db.find({'published':true}, function(err, data){
    console.log(data);
    res.send(data);
  });
});


io.on('connection', function (socket) {
  // var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('add user', function (data) {
    // we tell the client to execute 'new message'
    console.log(data);
  });

  socket.on('add word', function(data) {
    console.log("word: " + data)
  });
});

