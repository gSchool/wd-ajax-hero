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

  function updatePlot(id, plot) {
    $(`#${id} .modal-content p`).text(plot);
  }

  // ADD YOUR CODE HERE
  $("form").submit(function(event) {
    event.preventDefault();

    const searchString = $("#search").val();

    if (searchString) {
      movies = [];

      const $xhr = $.getJSON(`https://omdb-api.now.sh/?s=${searchString}`);

      $xhr.done(function(data) {
        if ($xhr.status !== 200) {
            return;
        }
        for (const movie of data.Search) {

          let posterURL = "";

          if (movie.Poster === "N/A") {
            posterURL = "https://subdict.org/Content/Images/movie-poster-placeholder.jpg";
          }
          else {
            posterURL = movie.Poster;
          }

          movies.push({id: movie.imdbID, title: movie.Title, year: movie.Year, poster: posterURL});

          getPlot(movie.imdbID);
        }

        renderMovies();
      });
    }
  });

  function getPlot(imdbID) {
    const $xhrPlot = $.getJSON(`http://www.omdbapi.com/?apikey=19099f8d&i=${imdbID}&plot=full`);

    $xhrPlot.done(function(plotData) {
      if ($xhrPlot.status !== 200) {
        return;
      }

      for (const movie of movies) {
        if (movie.id === plotData.imdbID) {
          movie.plot = plotData.Plot;
          updatePlot(movie.id, movie.plot);
        }
      }
    });
  }

})();
