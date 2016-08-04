var Event = require('../models/event')

module.exports = {
  createEvent: (data, cb)=>{
    new Event(data).save().then((event)=>{
      cb(event);
    });
  }
}
