var db = require('../config');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true
});

module.exports = Event;
