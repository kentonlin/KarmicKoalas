var db = require('../config');
var Route = require('./route');

var Keyword = db.Model.extend({
  tableName: 'keywords',
     routes: ()=> {
     return this.belongsToMany(Route);
   },
  hasTimestamps: true
});

module.exports = Keyword;
