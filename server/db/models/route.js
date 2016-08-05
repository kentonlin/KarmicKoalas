var db = require('../config');
var Keyword = require('./keyword');

var Route = db.Model.extend({
  tableName: 'routes',
  keywords: () =>{
     return this.belongsToMany(Keyword);
   },
  hasTimestamps: true
});

module.exports = Route;
