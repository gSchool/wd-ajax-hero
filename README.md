# Ajax Hero

In this exercise, you're tasked with extending a web application to make Ajax calls to the OMDb API and update the DOM. To get started, fork and clone this repository.

## Search

The web application should allow the user to browse movies by search keywords.

![](screenshots/search.gif)

More specifically, you'll need to extend the existing JavaScript with the following behavior.

<!-- - Listen for submissions on the search form. Remember to prevent the default action. -->
- Validate the user input is not blank.
- Clear the previous search results.
<!-- - Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint. -->
  <!-- - The API requires a key so you will need to send requests to this url instead: -->
    <!-- - https://omdb-api.now.sh/ -->
    <!-- - Example: https://omdb-api.now.sh/?s=star%20wars -->
<!-- - Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array. -->
<!-- - Render the `movies` array to the page by calling the `renderMovies()` function with no arguments. -->

<!-- Each well-formed `movie` object in the `movies` array must have the following key-value pairs. -->

| Key      | Value                               |
|----------|-------------------------------------|
| `id`     | The movie's unique imdb ID number.  |
| `poster` | The URL to the movie's poster image |
| `title`  | The title of the movie.             |
| `year`   | The year of the movie's release.    |

## Bonus

The web application should also allow the user to view a movie's full plot by clicking on the "Plot Synopsis".

![](screenshots/plot.gif)

While the application is handling the first HTTP response, you'll need to extend your JavaScript with the following behavior.

- Use the movie's unique imdb ID to send an HTTP request to the [OMDB API](http://omdbapi.com/) id endpoint.
- Handle the HTTP response by pushing a new, well-formed JavaScript object into the global `movies` array.
- Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.

Each well-formed `movie` object in the `movies` array must have the following additional key-value pairs.

| Key    | Value                 |
|--------|-----------------------|
| `plot` | The movie's full plot |
