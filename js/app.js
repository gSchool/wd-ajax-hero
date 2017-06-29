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

      $plot.addClass('waves-effect waves-light btn modal-trigger plot');
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

  const getMovies = function(searchTerm) {
    const url = `https://www.omdbapi.com/?apikey=19099f8d&s=${searchTerm}`;
    const $xhr = $.getJSON(url);

    $xhr.done(function(data) {
      if ($xhr.status!== 200) {
        return
      }
      movies = data.Search.map(function(movie) {
        return {
          id: movie.imdbID,
          poster: movie.Poster,
          title: movie.Title,
          year: movie.Year,
        };
      });

//for every movie grab id and put that id in second json call.
        for (const movie of movies) {
          const url = `https://www.omdbapi.com/?apikey=19099f8d&i=${movie.id}&plot=full`;
          const $xhrID = $.getJSON(url);

          $xhrID.done(function(data) {
            if ($xhrID.status!== 200) {
              return
            }
            movie.plot = data.Plot;
            renderMovies();
          });
        }
      });
};

  $('button[type=submit]').on('click', function(event) {
      event.preventDefault();

      const searchTerm = $('#search').val();
      if (searchTerm === "") {
        Materialize.toast('Please enter a search term.', 4000);
      }
      getMovies(searchTerm);
  });

})();
