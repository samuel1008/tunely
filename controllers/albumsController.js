/************
 * DATABASE *
 ************/

/* hard-coded data */
var db = require('../models');


// GET /api/albums
function index(req, res) {
  // FILL ME IN !

  // send all books as JSON response
    db.Album.find(function(err, albums){
      if (err) {
        console.log("noooo");}
  res.json(albums);
  console.log("albumsController 1");
      });

}

function create(req, res) {
  // FILL ME IN !
  console.log('Album create', req.body);
  /* db.Album came from album model */
  var newAlbum = new db.Album(req.body);
  console.log("yay i added a new team!");
  newAlbum.save(function(err, album){
    if (err){
      console.log("error!!!!");
    }
    res.json(album);

  });
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
