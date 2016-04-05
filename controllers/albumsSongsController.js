/*albumsSongsController*/
var db= require('../models');

/*POST '/api/albums/:albumsId/songs'*/
function create(req, res){
  db.Album.findById(req.params.albumId, function(err, foundAlbum){
    console.log(req.body);
    /* grab incoming data*/
    var newSong = new db.Song(req.body);
    foundAlbum.songs.push(newSong);
    foundAlbum.save(function(err, savedAlbum){
      console.log('newSong create:', newSong);
      /*responding with just the song*/
      res.json(newSong);
    });
  });
}

module.exports = {create: create};
