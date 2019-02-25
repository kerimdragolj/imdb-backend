// Initializes the `ratings` service on path `/ratings`
const createService = require('feathers-sequelize');
const createModel = require('../../models/ratings.model');
const hooks = require('./ratings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  // Initialize our service with any options it requires
  app.use('/ratings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('ratings');

  service.hooks(hooks);
};
