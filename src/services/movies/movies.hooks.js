const {
  authenticate
} = require('@feathersjs/authentication').hooks;

function includeBefore(hook) {
  hook.params.sequelize = {
    include: [{
        model: hook.app.services.actors.Model,
        as: 'actors'
      },
      {
        model: hook.app.services.genres.Model,
        as: 'genres'
      },
      {
        model: hook.app.services.ratings.Model,
        as: 'ratings',
      }
    ]
  }
  return hook;
}

function addManyToManyRelations(hook) {
  for (let i = 0; i < hook.result.length; i++) {
    hook.data[i].genres.forEach((el) => {
      hook.result[i].setGenres(hook.data[i].genres);
    })
    hook.data[i].actors.forEach((el) => {
      hook.result[i].setActors(hook.data[i].actors);
    })
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
    create: [hook => addManyToManyRelations(hook)],
    update: [hook => addManyToManyRelations(hook)],
    patch: [hook => addManyToManyRelations(hook)],
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