(function() {
  'use strict'

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({
        delay: 50,
      });
      $title.text(movie.Title);

      var $Poster = $('<img class="Poster">');

      $Poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $Poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.Title);
      var $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      var $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  //mine
  window.onload = function() {
    // var className = document.getElementsByClassName("btn-large waves-effect waves-light")[0];
    var className = document.getElementsByClassName("btn-large")[0];
    className.addEventListener('click', function() {
      // console.log("i'm working")
    })
    className.addEventListener('click', doAjax);
    // console.log(className);
  }


  // event.preventDefault();
  // console.log(className);

  function doAjax(event) {
    let title = document.getElementById('input').value;
    // console.log(title);
    event.preventDefault();


    jQuery.ajax({
      url: 'https://www.omdbapi.com/?t=' + title + '&y=&plot=short&r=json',
      method: "GET",
      success: function(data) {
        console.log(data);
        movies.push(data);
        renderMovies();

      }
    });
  }



})();
