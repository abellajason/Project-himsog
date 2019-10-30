const users = require('./users/users.service.js');
const children = require('./children/children.service.js');
const records = require('./records/records.service.js');
const donations = require('./donations/donations.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(children);
  app.configure(records);
  app.configure(donations);
};
