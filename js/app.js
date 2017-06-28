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
      console.log(movie);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $("form").on('submit', function(event){
    event.preventDefault();
    if ($('#search').val() === ""){
      Materialize.toast("Please enter a search term.", 4000);
    }
    sendRequest($('#search').val());
  });
  function sendRequest(searchVal){
    const url = `https://www.omdbapi.com/?apikey=19099f8d&s=${searchVal}`;
    const xhr = $.getJSON(url);
    xhr.done(function(data){
      if (xhr.status !== 200){
        return;
      }
      let movieData = data.Search;
      let lowCase = movieData.map(function(p) {
        return {title: p.Title, poster: p.Poster, year: p.Year, id: p.imdbID};
      });
      movies = lowCase;
      for (let i = 0; i < movies.length; i++){
        let movie = movies[i];
        let iD = movie.id;
        let urlId = "http://www.omdbapi.com/?apikey=19099f8d&i=" + iD + "&plot=full";
        const xhrId = $.getJSON(urlId);
        xhrId.done(function(data){
          if (xhrId.status !== 200){
            return;
          }
          movies[i].plot = data.Plot;
          renderMovies();
        })
      }
    });
  }
})();
