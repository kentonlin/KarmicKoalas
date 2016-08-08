var Route = require('../models/route.js');

module.exports = {
  createRoute: (body, cb)=>{
     const data = {
        title: body.title,
        start: body.start,
        end: body.end,
        route_object: body.routeObject
      }
    new Route(data).save().then((route)=>{
    //  cb(route);
    return(route)
    });
  }
}
 // searchRoutes: (body, cb)=>{
  //   new Route.where('keyword1','<>',body.keyword1 ||  ).then((keyword)=>{
  //     Promise.all(JSON.parse(user.get('routes')).map((eventId)=>{
  //       return new Route({id: routeId}).fetch()
  //     })).then((routes)=>{
  //       cb(routes);
  //     })
  //   })
 //  }


//search by proximity to start & end
//     search within some distance of start & end locs


//make join table of keyId and routeId

//what is index table
// bookshelf.knex('Inv')
//   .join('Comp', 'Comp.cId', '=', 'Inv.cId')
//   .where('Inv.id', 2)
//   .select()
//   .then(...)

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('books', function(table) {
//     table.increments('id').primary();
//     table.string('name');
//   }).createTable('authors', function(table) {
//     table.increments('id').primary();
//     table.string('name');
//   }).createTable('authors_books', function(table) {
//     table.integer('author_id').references('authors.id');
//     table.integer('book_id').references('books.id');
//   });
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('books')
//     .dropTable('authors')
//     .dropTable('authors_books');
// };
