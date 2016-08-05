var db = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'karmic'
  }
});

db.schema.hasTable('users').then(function(exists){
  if(!exists){
    return db.schema.createTable('users', function(user){
      user.increments('id').primary();
      user.string('name', 100);
      user.string('username', 100).unique();
      user.string('email', 100).unique();
      user.json('routes');
      user.json('events');
      user.timestamps();
    });
  }
});

db.schema.hasTable('keyword').then(function(exists){
  if(!exists){
    return db.schema.createTable('keyword', function(keyword){
      keyword.increments('id').primary();
      keyword.string('word', 100);
      keyword.timestamps();
    });
  }
});
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('name');
  }).createTable('authors', function(table) {
    table.increments('id').primary();
    table.string('name');
  }).createTable('authors_books', function(table) {
    table.integer('author_id').references('authors.id');
    table.integer('book_id').references('books.id');
  });
};
db.schema.hasTable('routes').then(function(exists){
  if(!exists){
    return db.schema.createTable('routes', function(route){
      route.increments('id').primary();
      route.string('title', 100);
      route.json('start',100);
      route.json('end',100);
      route.json('points_of_interest');
      route.json('route');
      route.timestamps();
    });
  }
});

db.schema.hasTable('events').then(function(exists){
  if(!exists){
    return db.schema.createTable('events', function(event){
      event.increments('id').primary();
      event.integer('hostId').unsigned().references('users.id');
      event.integer('routeId').unsigned().references('routes.id');
      event.json('invitees');
      event.json('acceptedInvitees');
      event.timestamps();
    });
  }
});


var bookshelf = require('bookshelf')(db);
module.exports = bookshelf;
