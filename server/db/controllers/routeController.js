var Route = require('../models/route.js');

module.exports = {
  createRoute: (data, cb)=>{
    new Route(data).save().then((route)=>{
      cb(route);
    });
  }
}
