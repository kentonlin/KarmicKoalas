var db = require('../config');

var Event = db.Model.extend({
  tableName: 'events',
  events: ()=> {
     return this.belongsToMany(Event);
   },
  hasTimestamps: true
});

module.exports = Event;


