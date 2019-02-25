
const users = require('./users/users.service.js');
const actors = require('./actors/actors.service.js');
const genres = require('./genres/genres.service.js');
const ratings = require('./ratings/ratings.service.js');
const movies = require('./movies/movies.service.js');
const shows = require('./shows/shows.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(actors);
  app.configure(genres);
  app.configure(ratings);
  app.configure(movies);
  app.configure(shows);
};
