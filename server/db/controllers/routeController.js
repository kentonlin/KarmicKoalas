var Route = require('../models/route.js');

module.exports = {
  createRoute: function(data, cb){
    new Route(data).save().then(function(route){
      cb(route);
    });
  }
}
