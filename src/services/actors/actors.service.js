// Initializes the `actors` service on path `/actors`
const createService = require('feathers-sequelize');
const createModel = require('../../models/actors.model');
const hooks = require('./actors.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  // Initialize our service with any options it requires
  app.use('/actors', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('actors');

  service.hooks(hooks);
};
