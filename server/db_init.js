var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Source: https://mongoosejs.com/docs/2.7.x/docs/populate.html

var RoomSchema = new Schema({
  title: {type: String, required: true, unique: false},
  owner: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],  //fkey and array
  settings: Schema.Types.Mixed,
  roomId: {type: String, required: true, unique: true},
  location: Schema.Types.Mixed
}, {
  timestamps: true
});

var UserSchema = new Schema({
  userId: {type: String, required: true, unique: true},
  userIdPub: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: false},
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  location: Schema.Types.Mixed
}, {
  timestamps: true
});

var MessageSchema = new Schema({
  userIdPub: {type: String, required: true, unique: false},
  message: {type: String, required: true, unique: false},
  mood: {type: String},
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },  // fkey
  roomId: String
}, {
  timestamps: true
});

var Room = mongoose.model("Room", RoomSchema);
var User = mongoose.model("User", UserSchema);
var Message = mongoose.model("Message", MessageSchema);

mongoose.connect('mongodb://mongodb:7f1c982e835a68959859b5d3da2b8e4b3af30b31@ds233596.mlab.com:33596/heroku_9j6mg1f5');

const mongodb = mongoose.connection;

module.exports = {
  mongodb: mongodb,
  schema: {
    User: User,
    Message: Message,
    Room: Room
  }
}
