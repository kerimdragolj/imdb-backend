const {
  authenticate
} = require('@feathersjs/authentication').hooks;

function includeBefore(hook) {
  hook.params.sequelize = {
    include: [{
        model: hook.app.services.movies.Model,
        as: 'movie'
      },
      {
        model: hook.app.services.shows.Model,
        as: 'show'
      },
      {
        model: hook.app.services.users.Model,
        as: 'user'
      }
    ]
  }
  return hook;
}

//Modify movies/shows rating depending on users rating
async function refreshAverageRating(hook) {
  if (hook.data) {
    if (hook.data.showId) { //if user rated show
      let shows = await hook.app.service('shows').find({ //find that show in db
        query: {
          id: hook.data.showId
        }
      });
      let show = shows.data[0];
      if (hook.data.prevRating) { //check if he previously rated it
        let totalRating = (show.vote_average * show.vote_count) + (hook.data.rating - hook.data.prevRating);
        show.vote_average = totalRating / show.vote_count;
      } else { //if user is rating it for the first time
        let totalRating = (show.vote_average * show.vote_count) + hook.data.rating;
        show.vote_average = totalRating / (show.vote_count + 1);
        show.vote_count++;
      }
      hook.app.service('shows').patch(show.id, { //modify shows average rating
        vote_count: show.vote_count,
        vote_average: show.vote_average
      });
    } else { //if user rated movie
      let movies = await hook.app.service('movies').find({ //find that movie in db
        query: {
          id: hook.data.movieId
        }
      });
      let movie = movies.data[0];
      if (hook.data.prevRating) { //check if he previously rated it
        let totalRating = (movie.vote_average * movie.vote_count) + (hook.data.rating - hook.data.prevRating);
        movie.vote_average = totalRating / movie.vote_count;
      } else { //if user is rating it for the first time
        let totalRating = (movie.vote_average * movie.vote_count) + hook.data.rating;
        movie.vote_average = totalRating / (movie.vote_count + 1);
        movie.vote_count++;
      }
      hook.app.service('movies').patch(movie.id, { //modify movies average rating
        vote_count: movie.vote_count,
        vote_average: movie.vote_average
      });
    }
  }
  return hook;
}

module.exports = {
  before: {
    all: [hook => includeBefore(hook), authenticate('jwt')],
    find: [],
    get: [],
    create: [hook => refreshAverageRating(hook)],
    update: [hook => refreshAverageRating(hook)],
    patch: [hook => refreshAverageRating(hook)],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};