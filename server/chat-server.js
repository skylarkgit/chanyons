const app = require('express')();
const uuidv4 = require('uuid/v4');
const socket = require('socket.io');
const cors = require('cors');
const session = require('express-session');
const db = require('./db_init');

app.use(cors());
app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false }
}))

var server = app.listen(4000, function() {
  console.log('started');
});

var io = socket(server);

/*************** DB **************/
var rooms = []; // {owner, member[], title, settings, history}
var user = []; // {name, user_id, user_id_pub, gravatar}
db.mongodb.on('connected',() => {
  console.log('mongoose connected');
});
// message = {user_id_pub, message, mood, replyto}
/*********************************/
app.get('/new-user', (req, res) => {
  res.send(userSet(req, res));
});

app.get('/create', (req, res) => {
  const user = userSet(req, res);
  var roomId = uuidv4();
  owner[roomId] = user.userId;
  res.send({
    roomId: roomId
  });
});



io.on('connection', function(socket) {
  console.log('connection', socket.id);
  socket.on('join', function(room) {
    if (owner[room]) {
      socket.join(room);
      socket.on(room, (data) => {
        console.log('recieved', data);
        var msg = new db.schema.Message({userIdPub: userIdPub, message: data, mood: 'poker', replyTo: null, roomId: room});
        msg.save(function(err) {
          console.log(err);
        });
        io.sockets.emit(room, data);
      });
    } else {

    }
  });
});

var userSet = function(req, res) {
  let userId = uuidv4(), userIdPub = uuidv4();
  if (!req.cookies || !req.cookies.user_id || !req.cookies.user_id_pub) {
    var user = new db.schema.User({userId: userId, userIdPub: userIdPub});
    user.save(function(err) {
      console.log(err);
    });
    res.cookie('user_id', userId);
    res.cookie('user_id_pub', userIdPub);
  } else {
    userId = req.cookies.user_id;
    userIdPub = req.cookies.user_id_pub;
  }
  return ({
    userId: userId,
    userIdPub: userIdPub
  });
}
