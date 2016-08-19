var Route = require('../models/route.js');

module.exports = {
  createRoute: (body, cb)=>{
      const data = {
        title: body.title,
        start: body.start,
        start_address: body.startAddress,
        end: body.end,
        end_address: body.endAddress,
        route_object: body.routeObject
      }
     return new Route(data).save();
  }
}
