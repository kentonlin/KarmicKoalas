var Route = require('../models/route.js');

module.exports = {
  createRoute: (data, cb)=>{
    new Route(data).save().then((route)=>{
      cb(route);
    });
  },
  searchRoutes: (body, cb)=>{
  //   new Route.where('keyword1','<>',body.keyword1 ||  ).then((keyword)=>{
  //     Promise.all(JSON.parse(user.get('routes')).map((groupId)=>{
  //       return new Route({id: routeId}).fetch()
  //     })).then((routes)=>{
  //       cb(routes);
  //     })
  //   })
   }
}

//search by keyword

//search by proximity to start & end
