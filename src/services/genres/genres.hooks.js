const { authenticate } = require('@feathersjs/authentication').hooks;

function includeBefore(hook) {
  hook.params.sequelize = {
    include: [{
        model: hook.app.services.movies.Model,
        as: 'movies'
      },
      {
        model: hook.app.services.shows.Model,
        as: 'shows'
      }
    ]
  }
  return hook;
}

module.exports = {
  before: {
    all: [hook => includeBefore(hook)],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
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