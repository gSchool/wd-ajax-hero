(function() {
    'use strict';

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
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50,
            });
            $title.text(movie.title);

            var $poster = $('<img class="poster">');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            var $action = $('<div class="card-action center">');
            var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            var $modal = $(`<div id="${movie.id}" class="modal">`);
            var $modalContent = $('<div class="modal-content">');
            var $modalHeader = $('<h4>').text(movie.title);
            var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            var $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    // ADD YOUR CODE HERE

    /// Get the input
    var input = $('input');

    /// Click handler for button to start Ajax request
    $('button').click(function() {
        /// Prevent default message from refreshing the browser and losing data
        event.preventDefault();

        /// Clear previous movies from array
        movies = [];

        /// Do Ajax request if form is filled
        if ($(input).val() !== "") {
            let userInput = $(input).val();
            sendAjaxRequest(userInput);
        }
    });

    function sendAjaxRequest(search) {
        // Request object for AJAX
        let requestObject = {
            url: `https://www.omdbapi.com/?s=${search}&y=&plot=short&r=json`,
            method: "GET",
            success: handleSuccess
        };
        // Start the AJAX request
        $.ajax(requestObject);
    }

    // Builds the movie list with movies in appropriate format
    function handleSuccess(data) {
        movies = data.Search.map(function(item){
            return {
                poster: item.Poster,
                title: item.Title,
                type: item.Type,
                year: item.Year,
                id: item.imdbID
            }
        })

        renderMovies()
    }


})();
