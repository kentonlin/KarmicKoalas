var db = require('../config');
var Route = require('./route');

var Keyword = db.Model.extend({
  tableName: 'Keywords',
     routes: ()=> {
     return this.belongsToMany(Route);
   }
});

module.exports = Keyword;
