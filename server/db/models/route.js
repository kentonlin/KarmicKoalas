var db = require('../config');

var Route = db.Model.extend({
  tableName: 'Routes'
});

module.exports = Route;
