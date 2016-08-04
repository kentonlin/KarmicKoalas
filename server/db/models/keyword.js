var db = require('../config');

var Keyword = db.Model.extend({
  tableName: 'keyword',
  hasTimestamps: true
});

module.exports = Keyword;
