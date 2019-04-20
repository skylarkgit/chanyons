const app = require('express')();
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
  saveUninitialized: false,
  proxy: undefined,
  rolling: true,
  unset: 'destroy'
 });
const db = require('./db_init');
const cookieParser = require('cookie-parser');
const sharedsession = require("express-socket.io-session");

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
  console.log('started');
});

var io = socket(server);

io.use(sharedsession(session, {
  autoSave: true,
  secure: false,
  httpOnly: false
}));

db.mongodb.on('connected',() => {
  console.log('mongoose connected');
});


/**
 * Test controller
 */
app.get('/', (req ,res) => {
  const user = userSet(req, res);
  console.log(res.session);
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
app.get('/new-user', (req, res) => {
  res.send(userSet(req, res));
});

/**
 * Create a new group
 */
app.get('/create', (req, res) => {
  const user = userSet(req, res);

  req.session.userId = user.userId;
  req.session.userIdPub = user.userIdPub;

  var roomId = uuidv4();
  const room = new db.schema.Room({title: 'Room', roomId: roomId, owner: user.userId, members: [], settings: {}});
  room.save(function(err) {
    console.log(err);
  });
  res.send({
    roomId: roomId
  });
});

app.get('/user', (req, res) => {
  const user = {
    userIdPub: req.session.userIdPub
  };
  console.log(user);
  res.send(user);
});

/**
 * Socket connection listener
 */
io.on('connection', function(socket) {
  console.log('connection', socket.id);
  socket.on('join', function(room) {
      socket.join(room);
      socket.on(room, (data) => {
        console.log('recieved', socket.handshake.session, data);
        var msg = new db.schema.Message({userIdPub: socket.handshake.session.cookie.userIdPub, message: data, mood: 'poker', replyTo: null, roomId: room});
        msg.save(function(err) {
          console.log(err);
        });
        io.sockets.emit(room, data);
      });
  });
});

/**
 * Sets the user cookies and creates if does not exists
 * @param {*} req 
 * @param {*} res 
 */
var userSet = function(req, res) {
  console.log('session', req.session);
  let userId = uuidv4(), userIdPub = uuidv4();
  if (!req.session || !req.session.userId || !req.session.userIdPub) {
    var user = new db.schema.User({userId: userId, userIdPub: userIdPub});
    user.save(function(err) {
      console.log(err);
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
