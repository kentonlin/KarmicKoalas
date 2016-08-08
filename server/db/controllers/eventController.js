var Event = require('../models/event')

module.exports = {
  createEvent: (body, cb)=>{
  const data = {
    hostId: req.body.hostId,
    routeId: req.body.routeId,
    invitees: req.body.invitees,
    acceptedInvitees: req.body.acceptedInvitees
  }
    new Event(data).save().then((event)=>{
      cb(event);
    });
  }
}
