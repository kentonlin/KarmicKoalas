var Event = require('../models/event')

module.exports = {
createEvent: (body, cb)=>{
  const data = {
    name: body.name,
    hostId: body.hostId,
    routeId: body.routeId,
    invitees: body.invitees
  }
    return new Event(data).save()
 }
}
