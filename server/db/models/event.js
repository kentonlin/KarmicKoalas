var db = require('../config');

var Event = db.Model.extend({
  tableName: 'Events',
  events: ()=> {
     return this.belongsToMany(Event);
   }
});

module.exports = Event;
