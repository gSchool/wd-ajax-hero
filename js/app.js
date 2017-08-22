(function() {
  'use strict';

  var movies;

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {

      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbID}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  const getMovies = (search) => {


  };


  $('form').on('submit', (e) => {
    e.preventDefault();
    const search = $('#search').val();

    var $xhr = $.getJSON(`http://www.omdbapi.com/?apikey=c5a8df09&s=${search}`);
    $xhr.done((data) => {
      if ($xhr.status !== 200){
        return;
      }

      movies = data.Search

      // for (const movie of movies){
      //
      //   var movieId = movie.imdbID;
      //
      //   var $xhr = $.getJSON(`http://www.omdbapi.com/?apikey=c5a8df09&i=${movieId}`);
      //   $xhr.done((data) => {
      //     if ($xhr.status !== 200){
      //       console.log(error)
      //     }
      //     movie.Plot = data.Plot
      //   });
      //
      // }

      renderMovies()

    });

  });
})();
