var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Source: https://mongoosejs.com/docs/2.7.x/docs/populate.html

var Room = new Schema({
  title: String,
  owner: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],  //fkey and array
  settings: Schema.Types.Mixed,
  date: Date
}, {
  timestamps: true
});

var User = new Schema({
  userId: String,
  userIdPub: String,
  message: String,
  mood: String,
}, {
  timestamps: true
});

var Message = new Schema({
  userIdPub: String,
  message: String,
  mood: String,
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' }  // fkey
}, {
  timestamps: true
});

mongoose.model("Room", Room);
mongoose.model("User", User);
mongoose.model("Message", Message);


mongoose.connect('mongodb://mongodb:7f1c982e835a68959859b5d3da2b8e4b3af30b31@ds233596.mlab.com:33596/heroku_9j6mg1f5');

const mongodb = mongoose.connection;

module.exports = {
  mongodb: mongodb
}
