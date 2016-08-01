var db = require('../config');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  groups: function(){
    return this.hasMany(Groups);
  }
});

module.exports = User;
