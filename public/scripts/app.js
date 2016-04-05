$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });
  /*catch and handle the click on an add song button*/
  $('#albums').on('click', '.add-song', handleAddSongClick);

  /*save song modal save button*/
  $('saveSong').on('click', handleNewSongSubmit);

  function handleNewSongSubmit(e) {
    e.preventDefault();
    var $modal = $('#songModal');
    var $songNameField = $modal.find('#songName');
    var $trackNumberField = $modal.find('#trackNumber');
    /*get the data from modal field*/
    /*note the server expect the keys to be 'name' and 'trackNumber'*/
    var dataToPost = {
      name: $songNameField.val(),
      trackNumber: $trackNumberField.val()
    };
    var albumId = $modal.data('albumId');
    console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id:', albumId);
    /*post to server */
    var songPostToServerUrl = '/api/albums/' + albumId + '/songs';
    $.post(songPostToServerUrl, dataToPost, function(data) {
      console.log('received data from post to /songs:', data);
      /*clear form*/
      $songNameField.val('');
      $trackNumberField.val('');
      /*close modal*/
      $modal.modal('hide');
      /*update the correct album to show new song*/
      $.get('/api/albums/' + albumId, function(data){
        /*update the current instance of the album from page*/
        $('[data-album-id=' + albumId + ']').remove();
          /*re-render it with the new data including song*/
          renderAlbum(data);
      });
    }).error(function(err) {
      console.log('post to /api/albums/:albumId/songs resulted in error', err);
    });
  }


  /*when the add song button is clicked, display the model*/
  function handleAddSongClick(e){
    console.log("added song click!");
    var currentAlbumId= $(this).closest('.album-id', currentAlbumId);
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();  // display the modal!
  }



  // this function takes a single album and renders it to the page
  function renderAlbum(album) {
    console.log('rendering album', album);
    var albumHtml = $('#albums-template').html();
    var albumsTemplate = Handlebars.compile(albumHtml);
    var html = albumsTemplate(album);
    $('#albums').prepend(html);
    console.log(2);
  }
  var $albumForm = $("form");
  $albumForm.on('submit', function(e) {
    e.preventDefault();
    console.log("app.js line 25 is working");
    console.log('new album serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serializeArray(),
      success: newAlbumSuccess,
      error: newAlbumError
    });
    $albumForm[0].reset();
  });

  function onSuccess(albums) {

    albums.forEach(function(album) {
      // console.log('ajax call works');
      /* we need to pass taco(album) as a arguement*/
      renderAlbum(album);
    });
  }

  function onError(e) {
    console.log('uh oh');
    $('#album').text('Failed to load albums, is the server working?');
  }

  function newAlbumSuccess(json) {
    /* needs to match form from line 23 */
    console.log("newAlbumSuccess works!!! app.js line 53");

    renderAlbum(json);
  }

  function newAlbumError() {
    console.log('new album errorr!!!!!!!');
  }

});
