var Route = require('../models/route.js');

module.exports = {
  createRoute: (data, cb)=>{
    new Route(data).save().then((route)=>{
      cb(route);
    });
  },
    searchRoutes: (body, cb)=>{
    new Route({id: id}).fetch().then((user)=>{
      Promise.all(JSON.parse(user.get('routes')).map((groupId)=>{
        return new Route({id: routeId}).fetch()
      })).then((routes)=>{
        cb(routes);
      })
    })
  }
}

