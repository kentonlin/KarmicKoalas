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

//search by keyword:
//   5 keyword fields in schema. push to results [] if any matches to user submitted array of search terms ['foo','bar','foot','head'...]
// activityGroupCollection
//   .query('where', {performer_id: [..., ...]})
//   .fetch({withRelated: ['performer']})

//search by proximity to start & end
//     search within some distance of start/end
