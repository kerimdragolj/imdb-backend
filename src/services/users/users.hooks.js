const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');

const { hashPassword } = require('@feathersjs/authentication-local').hooks;

function includeBefore(hook) {
  hook.params.sequelize = {
    include: [{
        model: hook.app.services.ratings.Model,
        as: 'ratings'
      }
    ]
  }
  return hook;
}

module.exports = {
  before: {
    all: [ hook => includeBefore(hook) ],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword({ passwordField: 'password' })],
    update: [authenticate('jwt'), hashPassword({ passwordField: 'password' })],
    patch: [ authenticate('jwt'), hashPassword({ passwordField: 'password' })],
    remove: [authenticate('jwt'),]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
