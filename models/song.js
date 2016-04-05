var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Song = require('./song');

var SongSchema = new Schema ({
  name: String,
  trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);
module.exports = Song;
