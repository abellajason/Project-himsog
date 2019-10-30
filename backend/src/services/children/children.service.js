// Initializes the `children` service on path `/children`
const createService = require('feathers-mongoose');
const createModel = require('../../models/children.model');
const hooks = require('./children.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/children', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('children');

  service.hooks(hooks);
};
