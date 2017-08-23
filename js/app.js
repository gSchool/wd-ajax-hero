(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

$('form').submit(function(event) {
  event.preventDefault();
  var title = $('#search').val()

  getMovies(title);
});

const getMovies = function(title) {

      var $xhr = $.getJSON(`https://omdb-api.now.sh/?s=${title}`)
      $xhr.done(function(data) {
          if ($xhr.status !== 200) {
              return;
          }
          console.log(data);

          const newIds = data.Search.map(function(mov) {
            var movId = {
              id: mov.imdbID,
            }
            console.log(movId);
            return movId;
          })

          let newMovies = [];
          const newMovie = data.Search.map(function(mov) {
            var movie = {
              id: mov.imdbID,
              poster: mov.Poster,
              title: mov.Title,
              year: mov.Year
            }
            console.log(movie);
            newMovies.push(movie)
            return movie;
          })
          movies = newMovies;
          console.log(movies);

          renderMovies();
      });
  }
})();
