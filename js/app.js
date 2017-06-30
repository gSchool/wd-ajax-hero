(function() {
  'use strict';

  //const movies = [];

  const renderMovies = function(movies) {
    $('#listings').empty();

    for (const movie of movies) {
      console.log(movies[0])
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

  // ADD YOUR CODE HERE
  //put event handler on input form
  $("form").on("submit", function(event) {
    event.preventDefault();
    getMovies( $("#search").val() );
  });

  //setup http event handler here to avoid nesting inside form event handler?
  function getMovies(searchTerm) {
    const $xhr = $.getJSON(`https://www.omdbapi.com/?apikey=19099f8d&s=${searchTerm}`);

    $xhr.done(function(jsonResponse) {
      if($xhr.status !== 200) {
        return;
      }

      console.log(jsonResponse.Response === "True")
      if(jsonResponse.Response === "True") {
        var moviesArray = jsonResponse.Search.filter(function(item) {
          return (item.Type === "movie");
        });

        if(moviesArray.length !== 0) {
          moviesArray = moviesArray.map(function(item) {
            return {
              'id': item.imdbID,
              'poster': item.Poster,
              'title': item.Title,
              'year': item.Year
            };
          });
        }

        renderMovies(moviesArray);
      }

    });
  }

})();
