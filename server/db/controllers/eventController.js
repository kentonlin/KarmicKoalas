var Event = require('../models/event')

module.exports = {
  createEvent: function(data, cb){
    new Event(data).save().then(function(event){
      cb(event);
    });
  },
}
