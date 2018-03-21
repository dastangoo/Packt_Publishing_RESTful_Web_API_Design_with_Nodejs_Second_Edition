var MongoClient = require('mongodb').MongoClient;
// var ObjectID = require('mongodb').ObjectID;
var database;

module.exports = {
  connect: function() {
    MongoClient.connect('mongodb://localhost:27017/twitter_notes', function(err, db) {
      if (err) {
        return console.log("Error: " + err);
      }
      
      db.open(function(err, deb) {
        database = db;
        console.log("Connected to database.");
      });
    });
  },
  connected: function() {
    return typeof database != 'undefined';
  },
  getFriends: function(userId, cb) {
    var cursor = database.collection('friends').find({
      for_user: userId
    });
    cursor.toArray(cb);
  },
  insertFriends: function(friends) {
    database.collection('friends').insert(friends, function(err) {
      
    });
  },
  getNotes: function(ownerId, friendId, cb) {
    
  },
  insertNote: function(ownerId, friendId, content, cb) {
    
  },
  updateNote: function(noteId, ownerId, content, cb) {
    
  },
  deleteNote: function(noteId, ownerId, cb) {
    
  }
};