const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const socket = require('socket.io');
const cors = require('cors');
const expressSession = require('express-session');
const session = expressSession({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  store: new expressSession.MemoryStore(),
  secure: false,
  cookie: { secure: false , maxAge: 600000, httpOnly: false},
  saveUninitialized: true,
  proxy: undefined,
  rolling: true,
  unset: 'destroy'
 });
const db = require('./db_init');
const cookieParser = require('cookie-parser');
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const cron = require('./cronjobs');

cron.schedule();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
app.use(cookieParser());
app.use(session);

var server = app.listen(4000, function() {
  console.log('* server started at 4000');
});

var io = socket(server);

// io.use(sharedsession(session, {
//   autoSave: true,
//   secure: false,
//   httpOnly: false
// }));
io.use(function(socket, next) {
  session(socket.handshake, {}, next); 
});

db.mongodb.on('connected',() => {
  console.log('* mongoose connected');
});


/**
 * Test controller
 */
app.get('/', (req ,res) => {
  const user = userSet(req, res);
  req.session.userId = user.userId;
  req.session.userIdPub = user.userIdPub;
  if(!req.session.dirty) {
    req.session.dirty = 1;
  }
  req.session.dirty++;
  res.send(req.session);
});

/**
 * Request to create a new user
 */
app.post('/new-user', (req, res) => {
  res.send(userSet(req, res));
});

/**
 * Request to create a new user
 */
app.post('/send-msg', (req, res) => {
  var msg = new db.schema.Message({
    userIdPub: req.session.userIdPub, 
    message: req.body.msg, 
    mood: 'poker', 
    replyTo: null, 
    roomId: req.body.roomId});
  msg.save((err, msg) => { 
    console.log('* message saved by user ' + req.session.userIdPub, msg);
    io.emit(msg.roomId, msg.message)
    res.send(true);
  });
});

/**
 * Create a new group
 */
app.get('/create', (req, res) => {
  const user = userSet(req, res);

  req.session.userId = user.userId;
  req.session.userIdPub = user.userIdPub;

  var roomId = uuidv4();
  console.info('* new room crated with title : ' + req.query.title);
  const room = new db.schema.Room({title: req.query.title, roomId: roomId, owner: user.userId, members: [], settings: {}});
  room.save((err, data) => {
    if (err){
      console.log('* error at "room save"', err);
      res.send(null);
    } else {
      console.log('* room saved with id ' + data.roomId);
      res.send({
        room: {
          roomId: data.roomId,
          title: data.title,
          settings: data.settings
        }
      });
    }
  });
});

/**
 * Get room by Id
 */
app.get('/room', (req, res) => {
  db.schema.Room.findOne(
    {roomId: req.query.roomId},
    (err, data) => {
      if (err) {
        console.log('* error at "get room"', err);
        res.send(err);
      } else {
        res.send(data);
      }
    });
});

/**
 * Get rooms of current user
 */
app.get('/rooms', (req, res) => {
  db.schema.User.findOne({userId: req.session.userId})
  .populate('rooms')
  .exec((err, data) => {
    console.log('userget', data);
      if (err) {
        console.log('* error at "get rooms" of user ' + req.session.userId, err);
        res.send(err);
      } else {
        res.send(data.rooms);
      }
    });
});



app.get('/user', (req, res) => {
  const user = {
    userIdPub: req.session.userIdPub
  };
  res.send(user);
});

/**
 * Socket connection listener
 */
io.on('connection', function(socket) {
  socket.on('join', function(room) {
    console.log('* ' + socket.handshake.session.userId + ' wants to join ' + room);
    addUserToRoom(socket.handshake.session.userId, room);
      socket.join(room);
      socket.on(room, (data) => {
        // socket.in(room).emit(data);
      });
  });
});

/**
 * Sets the user cookies and creates if does not exists
 * @param {*} req 
 * @param {*} res 
 */
var userSet = function(req, res) {
  let userId = uuidv4(), userIdPub = uuidv4();
  if (!req.session || !req.session.userId || !req.session.userIdPub) {
    var user = new db.schema.User({userId: userId, userIdPub: userIdPub, name: req.body.name});
    user.save(function(err) {
      if (err) {
        console.log('* error at setting user' ,err);
      }
    });
  } else {
    userId = req.session.userId;
    userIdPub = req.session.userIdPub;
  }

  req.session.userId = userId;
  req.session.userIdPub = userIdPub;

  return ({
    userId: userId,
    userIdPub: userIdPub
  });
}

function addUserToRoom(userId, roomId) {
  db.schema.Room.findOne({roomId: roomId},
    (err, room) => {
      if (err) {
        console.log('* error at getting room ' + roomId);
      } else {
        db.schema.User.findOne({userId: userId},
          (err, user) => {
            if (err) {
              console.log('* error at getting user ' + userId);
            } else {
              console.log('* Adding user ' + userId + ' to room ' + roomId);
              db.schema.Room.findOneAndUpdate(
                { roomId: roomId }, 
                { $push: { members: user } },
                null,
                (err, userUpd) => {
                  if (err) {
                    console.log('* error while adding user to room');
                  }
                });
              db.schema.User.findOneAndUpdate(
                { userId: userId }, 
                { $push: { rooms: room } },
                null,
                (err, userUpd) => {
                  if (err) {
                    console.log('* error while adding room to user');
                  }
                });
            }
          });
      }
    });
}