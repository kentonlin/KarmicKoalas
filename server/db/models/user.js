var db = require('../config');

var User = db.Model.extend({
  tableName: 'Users'
});


module.exports = User;
